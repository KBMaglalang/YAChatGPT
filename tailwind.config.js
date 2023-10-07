/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-white": "#FAFAF8",
        "brand-black": "#1E1E24",
        "brand-gold": "#A6873B",
        "brand-blue": "#243B55",
        "brand-teal": "#30656E",
        "brand-chat-area": "#2C2C34",
        "brand-chat-message": "#3E3E48",
        "brand-additional-elements": "#4A4A56",
      },
      fontFamily: {
        "brand-roboto": ["var(--font-roboto)"],
      },
    },
    plugins: [require("@tailwindcss/typography")],
  },
};
