/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        screen: "100dvh",
      },
      boxShadow: {
        "inner-lg": "0px 0px 10px 2px rgba(0,0,0,0.06) inset",
        "inner-2xl": "-10px 44px 25px -1px rgba(0,0,0,0.27) inset",
        "inner-border": "0px 0px 0px 1.5px rgba(0,0,0,1) inset",
      },
      keyframes: {
        like: {
          "0%,50%": { transform: "rotate(-30deg) scale(1.5)" },
          "100%": { transform: "rotate(0deg)" },
        },
        bookmark: {
          "0%, 50%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1.0)" },
        },
      },
      animation: {
        like: "like 0.3s",
        bookmark: "bookmark 0.3s",
      },
    },
  },
  plugins: [],
};
