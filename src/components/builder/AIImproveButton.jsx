'use client';

/**
 * AIImproveButton — Inline AI writing assistant
 *
 * Renders a small "✨ Mejorar con IA" button next to any text field.
 * On click, calls /api/improve-text and updates the Zustand store field
 * with the improved version.
 *
 * Props:
 *   fieldKey      — Zustand cvData key to update (e.g. 'summary')
 *   currentValue  — Current text content
 *   context       — Extra context sent to the AI (e.g. job title)
 *   updateFn      — Optional custom updater; defaults to store.updateField
 */

import { useState } from 'react';
import { Sparkles, Loader2, Check, AlertCircle } from 'lucide-react';
import useCVStore from '@/store/useCVStore';

export default function AIImproveButton({
  fieldKey,
  currentValue,
  context = '',
  updateFn,
}) {
  const { updateField } = useCVStore();
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'done' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleImprove = async () => {
    if (!currentValue?.trim() || currentValue.trim().length < 20) {
      setErrorMsg('Escribí al menos 20 caracteres primero.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/improve-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: currentValue, context, fieldKey }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const improved = data.improved?.trim();

      if (!improved) throw new Error('Respuesta vacía del servidor.');

      // Update the store (use custom fn if provided, else default updateField)
      if (updateFn) {
        updateFn(improved);
      } else {
        updateField(fieldKey, improved);
      }

      setStatus('done');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('[AIImproveButton]', err.message);
      setErrorMsg('No se pudo mejorar el texto. Intentá de nuevo.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  // ── Render states ──────────────────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 font-600 cursor-not-allowed">
        <Loader2 size={11} className="animate-spin" />
        Mejorando...
      </span>
    );
  }

  if (status === 'done') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-green-600 font-600">
        <Check size={11} />
        ¡Mejorado!
      </span>
    );
  }

  if (status === 'error') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-red-500 font-600">
        <AlertCircle size={11} />
        {errorMsg}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleImprove}
      disabled={!currentValue?.trim()}
      className="inline-flex items-center gap-1 text-[11px] text-electric hover:text-navy-900 font-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      title="Mejorar texto con inteligencia artificial"
    >
      <Sparkles size={11} />
      Mejorar con IA
    </button>
  );
}
