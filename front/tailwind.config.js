module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
      extend: {

      },
  },
  plugins: [

  ],
  variants: {
      extend: {
          transitionProperty: ['hover'],
          scale: ['active'],
          transform: ['active'],
      }
  }
}
