module.exports = {
  purge: ['./src/components/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    boxShadow: {
      'custom': '0px 0px 20px 0px rgba(91, 82, 96, 0.3) '
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
