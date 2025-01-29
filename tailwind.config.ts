import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#564665', // Default (equivalent to purple-500)
          100: '#DED8E4', // Light purple
          500: '#564665', // Base purple
          800: '#2a272e', // Dark purple
          900: '#020005', // Almost black
        },
        blue: {
          DEFAULT: "#99b9ca",
          100: "#99b9ca",
          500: "#6796b0"
        },
        red: {
          Default: "#ca99b9",
          100: "#ca99b9",
          500: "#b06772"
        },
        yellow: {
          Default: "#cac399",
          100: "#cac399",
          500: "#b0a667"
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
