/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter, sans-serif"
      },
      fontSize: {
        xxs: "0.7rem",
        xs: 14,
        sm: 16,
        md: 18,
        lg: 20,
        xl: 24,
        "2xl": 32
      },
      colors: {
        transparent: "transparent",

        "white": "#FFFFFF",
        "black": "#000000",

        gray: {
          200: "#B8B8B8",
          400: "#7C7C8A",
          500: "#545454",
          700: "#242425",
          800: "#202024",
          900: "#1C1C1C"
        },

        green: {
          500: "#1B7373",
          700: "#006666"
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
}
