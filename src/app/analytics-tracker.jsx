'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + '?' + searchParams.toString()

    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-TZ8VCXDHY3', {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return null
}