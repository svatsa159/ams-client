/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-blue": "#2a4365",
        "bg-blue-soft": "#cbdeff",
        primary: "#1a202c",
        accent: "#ecc94b",
      },
    },
  },
  plugins: [],
};
