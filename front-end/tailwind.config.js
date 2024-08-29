/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: {
    options: {
      safelist: [
        "bg-yellow-400",
        "bg-green-500",
        "bg-rose-400",
        "hover:bg-yellow-500",
        "hover:bg-green-600",
        "hover:bg-rose-500",
      ],
    },
  },
  theme: {
    extend: {
      height: {
        screen: "100dvh",
      },
      fontSize: {
        "3xl": "2.5rem",
        "4xl": "3rem",
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
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(100px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },
      animation: {
        like: "like 0.3s",
        bookmark: "bookmark 0.3s",
        fadeIn: "fadeIn 2s",
      },
      textColor: {
        gold: "#FFD700",
      },
    },
  },
  plugins: [],
};
