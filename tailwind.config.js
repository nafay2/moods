/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        body: ['Poppins', '"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        peony: {
          50: '#fff5f8',
          100: '#ffe9f0',
          200: '#ffd3e0',
          300: '#ffb3cb',
          400: '#ff8fb3',
          500: '#f76b9c',
          600: '#e0518a',
        },
        icy: {
          50: '#f2fbfd',
          100: '#e0f6fa',
          200: '#bfebf3',
          300: '#93dbe9',
          400: '#63c3d8',
          500: '#3fa6c0',
        },
        forest: {
          50: '#f1f8f2',
          100: '#dcece0',
          200: '#b3d6bb',
          300: '#84bd91',
          400: '#569a68',
          500: '#3a7a4d',
          600: '#255738',
          700: '#1a3d28',
          800: '#122b1c',
          900: '#0c1e13',
        },
        butter: {
          50: '#fffcf1',
          100: '#fff8dc',
          200: '#fef0b0',
          300: '#fde385',
          400: '#fbd25e',
          500: '#f3bc3a',
        },
        cream: '#fffaf6',
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 179, 203, 0.35)',
        'glow-blue': '0 0 40px rgba(147, 219, 233, 0.35)',
        'glow-gold': '0 0 40px rgba(253, 226, 133, 0.4)',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(110vh) translateX(var(--drift-x, 40px)) rotate(360deg)', opacity: '0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        heartPop: {
          '0%': { transform: 'translateY(0) scale(0.6)', opacity: '0' },
          '20%': { transform: 'translateY(-10px) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-90px) scale(0.8)', opacity: '0' },
        },
      },
      animation: {
        drift: 'drift linear forwards',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        heartPop: 'heartPop 1.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}
