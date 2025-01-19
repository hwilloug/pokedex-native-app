/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#f28482",
        primaryLight: "#F5CAC3",
        secondary: "#F6BD60",
        secondaryLight: "#F7EDE2",
        accent: "#84A59D"
      },
    },
  },
  plugins: [],
}