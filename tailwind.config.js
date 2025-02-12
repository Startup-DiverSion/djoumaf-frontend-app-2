/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
        love: ['Figtree', 'Lato', 'Cabin', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
