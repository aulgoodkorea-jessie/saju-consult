import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F5EF",
        ink: "#243447",
        pine: "#2E7774",
        lilac: "#A98BB8",
        mist: "#EAF3F1",
        paper: "#FFFCF7",
        line: "#D9D3C7",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
