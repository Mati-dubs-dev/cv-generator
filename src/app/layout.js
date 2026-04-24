import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import AnalyticsTracker from './analytics-tracker'

export const metadata = {
  title: 'CVRápido — Crear CV gratis online en minutos',
  description: 'Crea tu currículum vitae profesional gratis online.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-body antialiased bg-white text-navy-900">
        {children}

        {/* Tu tracker personalizado */}
        <AnalyticsTracker />

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-TZ8VCXDHY3" />

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  )
}