/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          50: "#FFF8DC",
          100: "#F5E6D3",
          200: "#E8DCC4",
          300: "#D2B48C",
          400: "#D2691E",
          500: "#A0522D",
          600: "#8B4513",
          700: "#5D2E11",
          800: "#3D1E0B",
          900: "#2D1508",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
