/**
 * robots.js — Robots.txt generation via Next.js App Router
 */
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: 'https://cvrapido.app/sitemap.xml',
  };
}
