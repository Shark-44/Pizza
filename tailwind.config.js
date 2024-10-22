/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
        satisfy: ['"Satisfy"', 'cursive'],
      },
      colors: {
        customOrange: '#e69623', 
      },
    },
  },
  plugins: [],
}

