/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon': {
          teal: '#4FD1C5',
          purple: '#B794F4',
          yellow: '#F6E05E'
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'space': 'radial-gradient(circle at center, #1a365d 0%, #0a192f 100%)'
      }
    },
  },
  plugins: [],
};