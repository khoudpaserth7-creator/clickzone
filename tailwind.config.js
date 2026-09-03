/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0457c8",
        "primary-deep": "#013196",
        "primary-on-nav": "#0046be",
        "grad-mid": "#2b4cb6",
        "grad-teal": "#7fd8ff",
        ink: "#030303",
        "ink-muted": "#3d3d3d",
        muted: "#70757d",
        canvas: "#ffffff",
        "surface-1": "#f3f4f6",
        "surface-2": "#e4e5e8",
        hairline: "#c4c8cf",
        "hairline-soft": "#90959e",
        scarcity: "#fff200",
      },
      fontFamily: {
        lao: ["'Noto Sans Lao'", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
      },
      backgroundImage: {
        "promo-gradient": "linear-gradient(100deg, #0457c8, #2b4cb6, #7fd8ff)",
      },
    },
  },
  plugins: [],
};
