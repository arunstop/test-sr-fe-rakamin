/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/ui/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "nunito-sans": ["Nunito Sans", "ui-sans-serif", "system-u"],
      inter: ["Inter", "ui-sans-serif", "system-u"],
    },

    extend: {
      // colors: {
      //   primary: "#01959F",
      //   secondary: "#FEEABC",
      //   danger: "#F5B1B7",
      //   success: "#B8DBCA",
      // },
      backgroundColor: {
        primary: "#F7FEFF",
        secondary: "#FFFCF5",
        danger: "#FFFAFA",
        success: "#F8FBF9",
      },
      borderColor: {
        primary: "#4DB5BC",
        secondary: "#FEEABC",
        danger: "#F5B1B7",
        success: "#B8DBCA",
      },
      textColor: {
        primary: "#01959F",
        secondary: "#FA9810",
        danger: "#E11428",
        success: "#43936C",
      },
    },
  },
  plugins: [],
}
