/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#51D4D6",
        secondary: "#1e1e1e",
        tertiary: "#0a0a0a",
        textLighter: "#d1d5db",
        textLight: "#9ca3af",
        textHeaders: "rgba(255, 255, 255, 0.9)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
