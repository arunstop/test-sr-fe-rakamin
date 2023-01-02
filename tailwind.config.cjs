/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/ui/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "nunito-sans": ["Nunito Sans", "ui-sans-serif", "system-u"],
      inter: ["Inter", "ui-sans-serif", "system-u"],
    },

    extend: {
      colors: {
        primary: "#01959F",
        secondary: "#FEEABC",
        danger: "#F5B1B7",
        success: "#B8DBCA",
      },
      backgroundColor: {
        "primary-main": "#01959F",
        primary: "#F7FEFF",
        "secondary-main": "#FEEABC",
        secondary: "#FFFCF5",
        "danger-main": "#F5B1B7",
        danger: "#FFFAFA",
        "success-main": "#B8DBCA",
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
      fontSize:{
        'sm':['12px','20px'],
        'base':['14px','24px'],
        'lg':['16px','26px'],
        'xl':['18px','28px'],
        '2xl':['22px','30px'],
        '3xl':['28px','36px'],
        '4xl':['36px','40px'],
        '5xl':['46px','48px'],
      }
    },
  },
  plugins: [
    // require("tailwindcss/plugin")(function ({ addBase }) {
    //   addBase({
    //     html: { fontSize: "14px" },
    //   })
    // }),
  ],
}
