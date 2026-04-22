import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/70 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center">
              <FileText size={14} className="text-accent" />
            </div>
            <span className="font-display text-lg text-white">CVRápido</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/builder" className="hover:text-white transition-colors">
              Crear CV
            </Link>
            <Link href="/#templates" className="hover:text-white transition-colors">
              Plantillas
            </Link>
            <a href="mailto:hola@cvrapido.app" className="hover:text-white transition-colors">
              Contacto
            </a>
          </nav>

          {/* Copy */}
          <p className="text-xs">
            © {new Date().getFullYear()} CVRápido. Gratis, siempre.
          </p>
        </div>
      </div>
    </footer>
  );
}
