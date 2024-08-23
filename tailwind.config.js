/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        modal : "#cececeb8",
        bgModal : "#2324318c"
      }
    },
  },
  plugins: [],
}
