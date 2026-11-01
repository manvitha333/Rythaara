/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F7F4',
          100: '#DCE9E1',
          200: '#B9D3C3',
          300: '#8DB89B',
          400: '#5E9674',
          500: '#3C7A56',
          600: '#2A6144',
          700: '#1F4D36',
          800: '#173D2B',
          900: '#0F2A1E',
        },
        cream: {
          50: '#FDFBF6',
          100: '#FAF6EC',
          200: '#F3EBD6',
          300: '#E9DDB8',
          400: '#D9C68E',
        },
        turmeric: {
          400: '#EFC563',
          500: '#E5AE28',
          600: '#C8931C',
          700: '#A57714',
        },
        earth: {
          400: '#9A6E54',
          500: '#80553A',
          600: '#6A472E',
          700: '#543A26',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'dash-flow': {
          '0%': { strokeDashoffset: '40' },
          '100%': { strokeDashoffset: '0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fade-in 0.8s ease forwards',
        'scale-in': 'scale-in 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'dash-flow': 'dash-flow 1.2s linear infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
