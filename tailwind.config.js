/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      textPrimary: "rgba(255,255,255,0.9)",
      textSecondary: "rgba(255,255,255,0.72)",
    },
      keyframes: {
        jiggle: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-1px) rotate(-0.4deg)" },
          "50%": { transform: "translateY(0) rotate(0.4deg)" },
          "75%": { transform: "translateY(-1px) rotate(0deg)" },
        },
      },
      animation: {
        jiggle: "jiggle 220ms ease-in-out",
      },
    },
  },
  plugins: [],
};
    