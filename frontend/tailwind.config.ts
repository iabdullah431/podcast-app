export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "scroll-bar": "scrollBar 2s linear infinite",
      },
      keyframes: {
        scrollBar: {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(30%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      colors: {
        "scroll-thumb": "#6B4080",
        "scroll-thumb-hover": "#9048C8",
        "scroll-track": "transparent",
      },
      fontFamily: {
        sans: ["IBMPlexSansArabic", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
