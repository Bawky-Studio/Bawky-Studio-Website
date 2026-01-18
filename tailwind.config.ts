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
        parchment: {
          50: "var(--color-parchment-50)",
          100: "var(--color-parchment-100)",
          200: "var(--color-parchment-200)",
          300: "var(--color-parchment-300)",
          400: "var(--color-parchment-400)",
          500: "var(--color-parchment-500)",
          600: "var(--color-parchment-600)",
          700: "var(--color-parchment-700)",
          800: "var(--color-parchment-800)",
          900: "var(--color-parchment-900)",
          950: "var(--color-parchment-950)",
        },
        "carbon-black": {
          50: "var(--color-carbon-black-50)",
          100: "var(--color-carbon-black-100)",
          200: "var(--color-carbon-black-200)",
          300: "var(--color-carbon-black-300)",
          400: "var(--color-carbon-black-400)",
          500: "var(--color-carbon-black-500)",
          600: "var(--color-carbon-black-600)",
          700: "var(--color-carbon-black-700)",
          800: "var(--color-carbon-black-800)",
          900: "var(--color-carbon-black-900)",
          950: "var(--color-carbon-black-950)",
        },
        "sandy-brown": {
          50: "var(--color-sandy-brown-50)",
          100: "var(--color-sandy-brown-100)",
          200: "var(--color-sandy-brown-200)",
          300: "var(--color-sandy-brown-300)",
          400: "var(--color-sandy-brown-400)",
          500: "var(--color-sandy-brown-500)",
          600: "var(--color-sandy-brown-600)",
          700: "var(--color-sandy-brown-700)",
          800: "var(--color-sandy-brown-800)",
          900: "var(--color-sandy-brown-900)",
          950: "var(--color-sandy-brown-950)",
        },
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
