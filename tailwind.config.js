/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'orange': '#feb931',
        'gray': '#9f9e9d',
        'white': '#fff',
        'linkBlue': '#71a5ea',
        'textGray': '#797979',
        'darkGray': '#1a1a1a',
        'lightGray': '#222222',
        'red': '#ff0000',
      },
      backgroundColor: {
        'gray-background': '#191919',
        'black': '#000',
      },
      backgroundImage: {
        'parallax-image': "url('/assets/bg_1.png')",
      },
      animation: {
        slideup: 'slideup 1s ease-in-out',
      },
      keyframes: {
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
    },
  },
  variants: {},
  plugins: [],
}; 