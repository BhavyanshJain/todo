/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Poppins", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        "circle-1": "rgba(255, 255, 255, 0.75)",
        "circle-2": "rgba(255, 255, 255, 0.05)",
        "card-1": "rgba(255,255,255 , 0.45)",
        "card-2": "rgba(255,255,255 , 0.6)",
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
