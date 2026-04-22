import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Static visual previews of each template style
const templates = [
  {
    id: 'modern',
    name: 'Moderno',
    tag: 'Más popular',
    accent: '#3B5BDB',
    desc: 'Diseño contemporáneo con barra lateral de color. Ideal para perfiles tech y creativos.',
    preview: <ModernPreview />,
  },
  {
    id: 'classic',
    name: 'Clásico',
    tag: null,
    accent: '#0F172A',
    desc: 'Elegante y sobrio. Perfecto para cargos ejecutivos y sectores tradicionales.',
    preview: <ClassicPreview />,
  },
  {
    id: 'minimalist',
    name: 'Minimalista',
    tag: 'Limpio',
    accent: '#6B7280',
    desc: 'Máximo espacio en blanco, tipografía protagonista. Para quien deja hablar el contenido.',
    preview: <MinimalistPreview />,
  },
];

// ─── Tiny static preview thumbnails ──────────────────────────────────────────

function ModernPreview() {
  return (
    <div className="w-full h-full bg-white flex overflow-hidden rounded-t-lg">
      {/* Sidebar */}
      <div className="w-[35%] bg-navy-900 p-3 flex flex-col gap-2">
        <div className="w-10 h-10 rounded-full bg-electric/40 mx-auto mb-1" />
        <div className="h-2 bg-white/30 rounded-full w-4/5 mx-auto" />
        <div className="h-1.5 bg-white/15 rounded-full w-3/5 mx-auto mb-2" />
        {['Contacto','Habilidades','Idiomas'].map((s) => (
          <div key={s}>
            <div className="h-1.5 bg-accent/60 rounded-full w-2/3 mb-1" />
            <div className="h-1 bg-white/20 rounded-full w-full mb-0.5" />
            <div className="h-1 bg-white/10 rounded-full w-4/5" />
          </div>
        ))}
      </div>
      {/* Main */}
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="h-2 bg-navy-900/70 rounded-full w-4/5" />
        <div className="h-1.5 bg-electric/50 rounded-full w-3/5 mb-2" />
        {['Experiencia','Educación'].map((s) => (
          <div key={s}>
            <div className="h-1.5 bg-navy-900/40 rounded-full w-2/5 mb-1" />
            <div className="h-1 bg-gray-200 rounded-full w-full mb-0.5" />
            <div className="h-1 bg-gray-100 rounded-full w-5/6 mb-0.5" />
            <div className="h-1 bg-gray-100 rounded-full w-3/4 mb-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ClassicPreview() {
  return (
    <div className="w-full h-full bg-white p-3 flex flex-col gap-2 rounded-t-lg">
      <div className="border-b-2 border-navy-900 pb-2 mb-1">
        <div className="h-2.5 bg-navy-900 rounded-full w-3/5 mb-1" />
        <div className="h-1.5 bg-gray-400 rounded-full w-2/5 mb-1" />
        <div className="flex gap-3">
          <div className="h-1 bg-gray-300 rounded-full w-1/4" />
          <div className="h-1 bg-gray-300 rounded-full w-1/4" />
        </div>
      </div>
      {['Perfil','Experiencia','Educación','Habilidades'].map((s) => (
        <div key={s}>
          <div className="h-1.5 bg-navy-900/50 rounded-full w-1/3 mb-1 uppercase" />
          <div className="h-0.5 bg-gray-200 rounded-full w-full mb-1" />
          <div className="h-1 bg-gray-200 rounded-full w-full mb-0.5" />
          <div className="h-1 bg-gray-100 rounded-full w-4/5" />
        </div>
      ))}
    </div>
  );
}

function MinimalistPreview() {
  return (
    <div className="w-full h-full bg-white p-3 flex flex-col gap-3 rounded-t-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="h-3 bg-gray-800 rounded w-28 mb-1.5" />
          <div className="h-1.5 bg-gray-300 rounded w-20" />
        </div>
        <div className="text-right">
          <div className="h-1 bg-gray-200 rounded w-16 mb-0.5" />
          <div className="h-1 bg-gray-200 rounded w-12" />
        </div>
      </div>
      {['','',''].map((_, i) => (
        <div key={i} className="border-t border-gray-100 pt-2">
          <div className="h-1.5 bg-gray-500 rounded w-1/4 mb-1" />
          <div className="h-1 bg-gray-200 rounded w-full mb-0.5" />
          <div className="h-1 bg-gray-100 rounded w-5/6" />
        </div>
      ))}
    </div>
  );
}

// ─── Section component ────────────────────────────────────────────────────────

export default function TemplatesPreview() {
  return (
    <section id="templates" className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-sm font-600 text-electric uppercase tracking-widest mb-3">
            Plantillas
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-navy-900 mb-4">
            Tres estilos, un objetivo
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Cada plantilla fue diseñada para destacar en distintos sectores y personalidades.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {templates.map(({ id, name, tag, desc, preview }) => (
            <div
              key={id}
              className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              {/* Preview thumbnail */}
              <div className="relative h-52 bg-gray-50 border-b border-gray-100 overflow-hidden">
                <div className="absolute inset-0 p-3">
                  <div className="w-full h-full">{preview}</div>
                </div>
                {tag && (
                  <span className="absolute top-3 right-3 bg-navy-900 text-white text-[10px] font-600 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display text-xl text-navy-900 mb-1">{name}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{desc}</p>
                <Link
                  href={`/builder?template=${id}`}
                  className="btn-primary w-full justify-center text-sm py-2.5"
                >
                  Usar esta plantilla
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/builder" className="text-sm text-electric hover:underline font-600">
            Ver todas las plantillas en el editor →
          </Link>
        </div>
      </div>
    </section>
  );
}
