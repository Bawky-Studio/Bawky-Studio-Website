import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        swhite: "rgb(var(--studio-white) / <alpha-value>)",
        black: "rgb(var(--studio-black) / <alpha-value>)",
        accent: "rgb(var(--studio-accent) / <alpha-value>)",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-1px, 1px)" },
          "20%": { transform: "translate(2px, -1px)" },
          "30%": { transform: "translate(-1px, 2px)" },
          "40%": { transform: "translate(1px, -2px)" },
          "50%": { transform: "translate(0.5px, 0.5px)" },
          "60%": { transform: "translate(-1.5px, 1px)" },
          "70%": { transform: "translate(1px, -0.5px)" },
          "80%": { transform: "translate(-0.5px, -1px)" },
          "90%": { transform: "translate(0.5px, 1px)" },
        },
      },
      animation: {
        glitch: "glitch 1s steps(2, end) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
