/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#2D5F8B",
      },
      borderColor: {
        primary: "#2D5F8B",
      },
    },
  },
  plugins: [],
};
