/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      scrollbar: ['rounded'],
    },
  },
  variants: {
    extend: {
      scrollbar: ['rounded'], // Move this inside extend
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
