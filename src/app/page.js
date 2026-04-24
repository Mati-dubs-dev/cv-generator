import { Suspense } from 'react'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/landing/Hero';
import Benefits from '@/components/landing/Benefits';
import HowItWorks from '@/components/landing/HowItWorks';
import TemplatesPreview from '@/components/landing/TemplatesPreview';
import CTA from '@/components/landing/CTA';

export const metadata = {
  title: 'CVRápido — Crear CV gratis online en minutos',
  description:
    'Crea tu currículum vitae profesional gratis. Elige entre 3 plantillas modernas, completá tus datos y descargá en PDF. Sin registro, sin límites.',
  alternates: {
    canonical: 'https://cvrapido.app',
  },
};

export default function HomePage() {
  return (
    <Suspense fallback={<div></div>}>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <TemplatesPreview />
        <CTA />
      </main>
      <Footer />
    </Suspense>
  );
}