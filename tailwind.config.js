/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Parisienne", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
