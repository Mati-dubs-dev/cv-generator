import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 bg-navy-900 relative overflow-hidden">
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 120%, rgba(91,141,239,0.25) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <p className="text-accent font-600 text-sm uppercase tracking-widest mb-4">
          ¿Listo para empezar?
        </p>
        <h2 className="font-display text-4xl sm:text-5xl text-white mb-6">
          Creá tu CV profesional ahora mismo.
        </h2>
        <p className="text-white/60 text-lg mb-10 leading-relaxed">
          Gratis, sin registro, en menos de 10 minutos. Tu próximo trabajo te está esperando.
        </p>
        <Link href="/builder" className="btn-accent inline-flex">
          Crear CV gratis
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
