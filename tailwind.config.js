

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
      keyframes: {
        textAnimation: {
          '0%': {
            'stroke-dashoffset': '500',
          },
          '80%': { 
            fill: 'transparent',
            "stroke-dashoffset": '0',
            
          },
          '100%': {
            fill: 'black',
            'stroke-dashoffset': '0',
          },
        },
      },
      animation: {
        textAnimation: 'textAnimation 4s ease-in-out 1 forwards', 
      },
    },
  },
  plugins: [],
}
