/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Comic Neue", "cursive"],
        body: ["Comic Neue", "cursive"],
      },
      colors: {
        slime: "#00D084",
        "fun-purple": "#9B51E0",
        "fun-pink": "#FF6B6B",
        "fun-blue": "#4DABF7",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        float: "float 6s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      boxShadow: {
        fun: "0 0 50px -12px rgba(0, 208, 132, 0.25)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "2rem",
        "3xl": "3rem",
      },
    },
  },
  plugins: [],
};
