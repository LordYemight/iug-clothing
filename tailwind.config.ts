import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#f5f0e8",
        accent: "#c9a84c"
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        sans: ["var(--font-body)"]
      }
    }
  },
  plugins: []
};
export default config;