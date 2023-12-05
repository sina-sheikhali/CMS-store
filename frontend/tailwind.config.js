/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        grayColor: "#191c24",
        bodyColor: "#000000",
        hoverColor: "#0F1015",
        lightGray: "#6c7293",
        greenColor: "#00d25b",
        redColor: "#FC424A",
        blueColor: "#0090E7",
        orangeColor: "#FFAB00",
        purpleColor: "#8F5FE8",
        bgModal: "rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
