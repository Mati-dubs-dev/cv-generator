/**
 * POST /api/improve-text
 *
 * Improves CV text using OpenAI GPT-4o-mini.
 * Falls back to a smart rule-based enhancer if OPENAI_API_KEY is not set,
 * so the feature works in development without any API key.
 *
 * Body: { text: string, context?: string, fieldKey?: string }
 * Response: { improved: string }
 */

import { NextResponse } from 'next/server';

// ─── Smart fallback enhancer (no API key required) ────────────────────────────
function smartFallback(text, fieldKey) {
  let improved = text.trim();

  // Capitalize first letter
  improved = improved.charAt(0).toUpperCase() + improved.slice(1);

  // Ensure ends with a period
  if (!/[.!?]$/.test(improved)) improved += '.';

  // Common replacements to make text more professional
  const replacements = [
    [/\bsoy\b/gi, 'me desempeño como'],
    [/\btengo experiencia\b/gi, 'cuento con experiencia sólida'],
    [/\btrabajé\b/gi, 'desarrollé mi carrera'],
    [/\bhice\b/gi, 'implementé'],
    [/\bbueno\b/gi, 'destacado'],
    [/\bmuy bueno\b/gi, 'sobresaliente'],
    [/\bpuede\b/gi, 'gestiona'],
    [/\btrabajar\b/gi, 'desarrollar'],
    [/\bresponsable de\b/gi, 'a cargo de'],
    [/\btambién\b/gi, 'adicionalmente'],
    [/\bademás\b/gi, 'asimismo'],
  ];

  replacements.forEach(([pattern, replacement]) => {
    improved = improved.replace(pattern, replacement);
  });

  // Add a prefix if it's a summary and doesn't already have one
  if (
    fieldKey === 'summary' &&
    !improved.toLowerCase().startsWith('profesional') &&
    !improved.toLowerCase().startsWith('especialista')
  ) {
    improved = `Profesional con ${improved.charAt(0).toLowerCase()}${improved.slice(1)}`;
  }

  return improved;
}

// ─── OpenAI call ──────────────────────────────────────────────────────────────
async function improveWithOpenAI(text, context, fieldKey) {
  const systemPrompt = `Sos un experto en redacción de currículums vitae profesionales en español rioplatense.
Tu tarea es mejorar el texto que te dé el usuario para que suene más profesional, conciso e impactante.
Reglas:
- Respondé ÚNICAMENTE con el texto mejorado, sin explicaciones ni comillas.
- Mantené el mismo idioma (español).
- Usá verbos de acción fuertes (lideré, desarrollé, implementé, optimicé, etc.).
- Sé conciso pero completo.
- No inventés información que no esté en el texto original.
- Máximo el doble de longitud del texto original.`;

  const userPrompt = `Mejorá este texto de CV (campo: ${fieldKey || 'descripción'}):
${context ? `Contexto adicional: ${context}\n` : ''}
Texto a mejorar:
${text}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 600,
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `OpenAI error ${response.status}`);
  }

  const data = await response.json();
  const improved = data.choices?.[0]?.message?.content?.trim();

  if (!improved) throw new Error('Empty response from OpenAI');
  return improved;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const { text, context = '', fieldKey = '' } = body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'El campo text es requerido.' },
        { status: 400 }
      );
    }

    if (text.trim().length < 10) {
      return NextResponse.json(
        { error: 'El texto es demasiado corto para mejorar.' },
        { status: 400 }
      );
    }

    let improved;

    // Use OpenAI if API key is available, otherwise use smart fallback
    if (process.env.OPENAI_API_KEY) {
      improved = await improveWithOpenAI(text, context, fieldKey);
    } else {
      // Fallback: rule-based enhancement (works without API key)
      improved = smartFallback(text, fieldKey);
    }

    return NextResponse.json({ improved }, { status: 200 });
  } catch (error) {
    console.error('[/api/improve-text]', error.message);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud. Intentá de nuevo.' },
      { status: 500 }
    );
  }
}
