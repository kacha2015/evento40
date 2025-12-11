/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#06b6d4"
      }
    }
  },
  plugins: []
};
