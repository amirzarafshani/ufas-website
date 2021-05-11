module.exports = {
  mode: 'jit',
  purge: [
    './app/index.html',
    './app/**/*.html',
    './app/**/*.{js,jsx}',
    './app/components/**/*.{js,jsx}',
    './app/containers/**/*.{js,jsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
