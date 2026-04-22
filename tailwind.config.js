/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/templates/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-dm-serif)', 'Georgia', 'serif'],
        body: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Brand colors
        navy: {
          50: '#f0f4ff',
          100: '#dde6ff',
          500: '#3B5BDB',
          600: '#2F4AC7',
          700: '#243AB0',
          800: '#1a2c8f',
          900: '#0F172A',
          950: '#080D1A',
        },
        cream: {
          50: '#FDFBF7',
          100: '#F8F3EA',
          200: '#F0E8D5',
        },
        accent: '#E8C547',   // warm gold accent
        electric: '#5B8DEF', // blue CTA
      },
      boxShadow: {
        'card': '0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        'a4': '0 4px 40px rgba(0,0,0,0.15)',
      },
      // A4 paper size in pixels (96dpi)
      width: {
        'a4': '794px',
      },
      minHeight: {
        'a4': '1123px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
