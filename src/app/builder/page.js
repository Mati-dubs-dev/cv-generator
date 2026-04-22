/**
 * /builder — CV Editor page
 *
 * Server Component: exports metadata + wraps BuilderClient in Suspense.
 * Suspense is required because BuilderClient calls useSearchParams().
 */
import { Suspense } from 'react';
import BuilderClient from '@/components/builder/BuilderClient';

export const metadata = {
  title: 'Crear CV online — Editor gratuito | CVRápido',
  description:
    'Usá el editor gratuito de CVRápido para armar tu currículum en minutos. Elegí una plantilla, completá tus datos y descargá en PDF.',
  robots: { index: false, follow: true },
};

function BuilderSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-[112px]">
      <div className="fixed top-16 left-0 right-0 z-40 h-12 bg-white border-b border-gray-100" />
      <div className="flex">
        <div className="w-[440px] shrink-0 border-r border-gray-200 p-4 flex flex-col gap-4">
          {[1,2,3,4].map(n => <div key={n} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />)}
        </div>
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <div className="w-[600px] h-[700px] bg-white rounded shadow-a4 animate-pulse opacity-50" />
        </div>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderSkeleton />}>
      <BuilderClient />
    </Suspense>
  );
}
