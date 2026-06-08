/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'owl-fly': 'owlFly 9s linear infinite',
        'owl-bob': 'owlBob 0.6s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        owlFly: {
          '0%':   { left: '-10%', transform: 'translateY(0) scaleX(-1)' },
          '24%':  { left: '40%',  transform: 'translateY(-30px) scaleX(-1)' },
          '49%':  { left: '90%',  transform: 'translateY(10px) scaleX(-1)' },
          '50%':  { left: '90%',  transform: 'translateY(10px) scaleX(1)' },
          '74%':  { left: '40%',  transform: 'translateY(-20px) scaleX(1)' },
          '100%': { left: '-10%', transform: 'translateY(0) scaleX(1)' },
        },
        owlBob: {
          '0%':   { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
