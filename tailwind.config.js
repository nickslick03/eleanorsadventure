/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      animation: {
        floatOut: 'float 1s ease-in-out',
        floatIn: 'float 1s ease-in-out reverse',
        grow: 'grow 6s ease-in-out infinite'
      },

      gridTemplateColumns: {
        'game': 'repeat(4, 1fr)',
      },

      keyframes: {
        float: {
          'from': {
            opacity: '1',
            transform: 'translateY(0)'
          },
          'to': {
            opacity: '0',
            transform: 'translateY(-100px)'
          }
        },
        grow: {
          'from': {
            transform: 'scale(.9)'
          },
          '50%': {
            transform: 'scale(1.1)'
          },
          'to': {
            transform: 'scale(.9)'
          }
        }
      },

    },
  },
  plugins: [],
}

