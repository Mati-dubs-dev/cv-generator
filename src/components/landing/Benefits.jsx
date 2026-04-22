import { Zap, Download, Layout, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Rápido y simple',
    desc: 'En menos de 10 minutos tenés tu CV listo. Sin curva de aprendizaje, sin complicaciones.',
  },
  {
    icon: Layout,
    title: 'Plantillas profesionales',
    desc: '3 diseños creados por diseñadores reales. Elegís el que más te representa.',
  },
  {
    icon: Download,
    title: 'Descarga en PDF',
    desc: 'PDF de alta calidad, formato A4, listo para enviar por email o adjuntar en LinkedIn.',
  },
  {
    icon: Shield,
    title: '100% gratis y privado',
    desc: 'Tus datos se guardan sólo en tu navegador. Sin registro, sin emails, sin trucos.',
  },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-navy-900 mb-4">
            Por qué elegir CVRápido
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Hecho para quienes quieren un CV de calidad sin perder tiempo.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Icon size={22} className="text-accent" />
              </div>
              <h3 className="font-display text-xl text-navy-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
