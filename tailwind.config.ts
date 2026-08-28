import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#12213A",
          950: "#0B1626",
          900: "#12213A",
          800: "#1B3054",
        },
        paper: "#EEEAE0",
        route: {
          teal: "#0E7C7B",
          tealDark: "#0A5F5E",
          amber: "#F2A93B",
          coral: "#E85D4E",
        },
      },
      fontFamily: {
        display: ["var(--font-unbounded)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-paper":
          "linear-gradient(rgba(18,33,58,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(18,33,58,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "28px 28px",
      },
    },
  },
  plugins: [],
};
export default config;
