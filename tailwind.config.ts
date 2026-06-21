import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      colors: {
        accent: "#E63946",
        card: "#EDEAE3",
        muted: "#888888",
        border: "#E0DDD6",
      },
    },
  },
  plugins: [],
};

export default config;
