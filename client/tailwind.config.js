/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "500px",
      md: "768px",
      lg: "992px",
      xl: "1180px",
    },
    backgroundImage: {
      bg: "url('/src/assets/bg.webp')",
    },
    extend: {},
  },
  plugins: [],
};
