/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#080808',
        graphite: '#151515',
        porcelain: '#f5f5f2',
        titanium: '#c8c8c2',
        signal: '#e8e8e3',
      },
      boxShadow: {
        soft: '0 24px 80px rgb(0 0 0 / 0.26)',
        'soft-lg': '0 44px 120px rgb(0 0 0 / 0.34)',
        line: 'inset 0 1px 0 rgb(255 255 255 / 0.08)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1.02)' },
          '50%': { transform: 'translate3d(0, -1.2%, 0) scale(1.045)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 760ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'slow-drift': 'slow-drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
