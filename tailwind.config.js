/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-primary": "#1cad7a",
        "gray-primary": "#616c6a",
      },
    },
  },
  plugins: [],
};
