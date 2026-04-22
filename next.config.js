/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable strict mode for better dev experience
  reactStrictMode: true,
};

module.exports = nextConfig;
