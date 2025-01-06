/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blackgreen: "#060D10",
        green: "#27403E",
        leave:"#87df2c",
        cyan: "#21a691"
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
