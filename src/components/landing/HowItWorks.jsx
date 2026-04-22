import Link from 'next/link';
import { ClipboardList, Eye, Download, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Completá tus datos',
    desc: 'Ingresá tu información: experiencia, educación, habilidades. El formulario te guía paso a paso.',
  },
  {
    number: '02',
    icon: Eye,
    title: 'Previsualizá en tiempo real',
    desc: 'Mirá cómo queda tu CV mientras escribís. Cambiá de plantilla con un click.',
  },
  {
    number: '03',
    icon: Download,
    title: 'Descargá en PDF',
    desc: 'Cuando estés conforme, descargá tu CV en PDF de alta calidad. Listo para enviar.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-sm font-600 text-electric uppercase tracking-widest mb-3">
            Proceso simple
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-navy-900 mb-4">
            Tres pasos y ya está
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map(({ number, icon: Icon, title, desc }, i) => (
            <div key={number} className="relative flex flex-col items-start">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute top-8 left-[calc(100%+0px)] w-full h-px bg-gray-200 -translate-x-1/2"
                  style={{ width: 'calc(100% - 64px)', left: '100%' }}
                />
              )}

              {/* Number + Icon */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center shrink-0">
                  <Icon size={26} className="text-accent" />
                </div>
                <span className="font-display text-5xl text-gray-100 select-none">{number}</span>
              </div>

              <h3 className="font-display text-2xl text-navy-900 mb-2">{title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/builder" className="btn-accent">
            Empezar ahora — es gratis
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
