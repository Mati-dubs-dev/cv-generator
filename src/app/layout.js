import './globals.css';
import Script from 'next/script';

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

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TZ8VCXDHY3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TZ8VCXDHY3');
          `}
        </Script>
      </body>
    </html>
  );
}