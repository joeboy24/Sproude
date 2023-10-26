/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css,scss}",
  ],
  theme: {
    colors: {
      // Other Colors
      ...colors
    },
    extend: {},
  },
  plugins: [],
});