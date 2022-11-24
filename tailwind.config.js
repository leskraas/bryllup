/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Alex Brush", "cursive", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        sand: {
          50: "#fcf7f0",
          100: "#fbf3e9",
          200: "#f9ebdb",
          300: "#f6e3cc",
          400: "#f3dbbd",
          500: "#f2d7b6",
          600: "#c2ac92",
          700: "#91816d",
          800: "#615649",
          900: "#302b24",
        },
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".min-h-iphone-safe": {
          "@apply min-h-screen": {},
          "min-height": "-webkit-fill-available",
        },
      });
    },
  ],
};
