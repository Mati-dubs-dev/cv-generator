import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-navy-900 flex items-center overflow-hidden">
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 110%, rgba(91,141,239,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 20%, rgba(232,197,71,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Social proof badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-1.5 mb-8 text-sm text-white/80 border border-white/10 animate-fade-in">
            <Star size={13} className="text-accent fill-accent" />
            <Star size={13} className="text-accent fill-accent" />
            <Star size={13} className="text-accent fill-accent" />
            <Star size={13} className="text-accent fill-accent" />
            <Star size={13} className="text-accent fill-accent" />
            <span className="ml-1">Más de 10.000 CVs creados</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6 animate-fade-up delay-100">
            Tu CV profesional,{' '}
            <span className="text-accent">listo en minutos.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-10 max-w-xl animate-fade-up delay-200">
            Elige una plantilla, completá tus datos y descargá tu currículum en PDF. Gratis, sin registro, sin límites.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
            <Link href="/builder" className="btn-accent">
              Crear mi CV ahora
              <ArrowRight size={18} />
            </Link>
            <a
              href="#templates"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white text-base font-600 hover:bg-white/5 transition-all duration-200"
            >
              Ver plantillas
            </a>
          </div>

          {/* Trust badges */}
          <p className="mt-8 text-sm text-white/40 animate-fade-up delay-400">
            ✓ Gratis &nbsp; ✓ Sin registro &nbsp; ✓ Descarga en PDF &nbsp; ✓ 3 plantillas profesionales
          </p>
        </div>
      </div>

      {/* Decorative CV mockup */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[480px] h-[620px] hidden lg:block opacity-20"
        style={{ right: '-40px' }}
      >
        <div className="w-full h-full bg-white rounded-2xl shadow-a4 border border-white/30 transform rotate-3" />
        <div className="absolute inset-4 bg-white/5 rounded-xl border border-white/10 transform -rotate-1" />
      </div>
    </section>
  );
}
