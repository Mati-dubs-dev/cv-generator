import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: 'CVRápido — Crear CV gratis online en minutos',
  description: 'Crea tu currículum vitae profesional gratis online.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head />
      
      <body className="font-body antialiased bg-white text-navy-900">
        {children}

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-TZ8VCXDHY3" />
      </body>
    </html>
  )
}