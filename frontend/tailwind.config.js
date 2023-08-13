/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        skyOrange: "rgb(255, 158, 0)",
        skyBlue: "#000FF5",
        crimRed: "#DC143C",
        honey: "#FFD700",
        offWhite: "#FAF9F9",
        darkBlue: "#091153",
      },
      screens: {
        md: { max: "768px" },
        sm: { max: "425px" },
        xs: { max: "320px" },
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(to right, rgb(245, 100, 0) 0%, rgb(255, 10, 80) 50%, rgb(255, 0, 165) 100%)',
      },

    },
  },
  plugins: [],
};
