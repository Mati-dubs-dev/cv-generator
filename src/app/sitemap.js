/**
 * sitemap.js — Auto-generated XML sitemap for Google
 * Next.js App Router convention: this file is picked up automatically.
 */

export default function sitemap() {
  const base = 'https://cvrapido.app';

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/builder`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
