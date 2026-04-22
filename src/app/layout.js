import './globals.css';

export const metadata = {
  title: 'CVRápido — Crear CV gratis online en minutos',
  description:
    'Crea tu currículum vitae profesional gratis online. Elige entre plantillas modernas, completa tus datos y descarga tu CV en PDF listo para enviar.',
  keywords:
    'crear cv gratis, curriculum vitae online, generador cv, cv pdf, plantillas cv, hacer curriculum',
  openGraph: {
    title: 'CVRápido — Crear CV gratis online',
    description: 'Crea tu currículum vitae profesional en minutos. Gratis, sin registro.',
    type: 'website',
    locale: 'es_AR',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Google Fonts loaded at runtime — no build-time fetch needed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://cvrapido.app" />
      </head>
      <body className="font-body antialiased bg-white text-navy-900">
        {children}
      </body>
    </html>
  );
}
