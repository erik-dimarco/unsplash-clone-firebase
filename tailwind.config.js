/** @type {import('tailwindcss').Config} */
module.exports = {
  variant: {
    visibility: ["group-hover", "first"],
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
