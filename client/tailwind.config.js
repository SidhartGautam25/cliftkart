/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        titleSize: [
          "1.8rem",
          {
            // text-2xl equivalent (24px)
            lineHeight: "2rem",
            fontWeight: "600", // font-semibold
          },
        ],
        titleTwoSize: [
          "0.875rem",
          {
            // text-sm equivalent (14px)
            lineHeight: "1.25rem",
            fontWeight: "500", // font-medium
          },
        ],
      },
      colors: {
        titleColor: "#1f2937", // gray-800
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
