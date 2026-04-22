'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const isBuilder = pathname === '/builder';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center group-hover:bg-navy-700 transition-colors">
            <FileText size={16} className="text-accent" />
          </div>
          <span className="font-display text-xl text-navy-900">CVRápido</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-600 text-gray-500">
          <Link href="/#how-it-works" className="hover:text-navy-900 transition-colors">
            Cómo funciona
          </Link>
          <Link href="/#templates" className="hover:text-navy-900 transition-colors">
            Plantillas
          </Link>
        </nav>

        {/* CTA */}
        <div>
          {isBuilder ? (
            <Link href="/" className="btn-secondary text-sm py-2 px-4">
              ← Inicio
            </Link>
          ) : (
            <Link href="/builder" className="btn-primary text-sm py-2.5 px-5">
              Crear CV gratis
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
