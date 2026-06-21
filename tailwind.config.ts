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
      },
      colors: {
        accent: "#E63946",
        card: "#F8F8F8",
        muted: "#9CA3AF",
        border: "#E5E7EB",
      },
    },
  },
  plugins: [],
};

export default config;
