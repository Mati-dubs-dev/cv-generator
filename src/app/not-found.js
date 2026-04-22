import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-cream-50 pt-16">
        <div className="text-center px-4">
          <p className="font-display text-[120px] text-navy-900/10 leading-none select-none">
            404
          </p>
          <h1 className="font-display text-4xl text-navy-900 -mt-6 mb-4">
            Página no encontrada
          </h1>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            La página que buscás no existe o fue movida.
          </p>
          <Link href="/" className="btn-primary">
            Volver al inicio
          </Link>
        </div>
      </main>
    </>
  );
}
