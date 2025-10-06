/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#f58846",
          dark: "#dd7434",
          light: "#ffd9bf",
        },
      },
    },
  },
  plugins: [],
};
