/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "sky": "url(/sky.jpeg)",
        "universe": "url(/universe.jpg)",
        "woodDark": "url(/wood.avif)",
        "wood1": "url(/wood1.jpg)",
        "nightsky": "url(/nightsky.avif)",
        "sea": "url(/sea.jpg)",
        "summer": "url(/summer.jpg)",
        "pool": "url(/pool.jpg)",
        "mystery": "url(/mystery.jpg)",
        "summerBeach": "url(/summerBeach.jpg)",
        "curve": "url(/curve.jpg)",
        "summerBeach2": "url(/summerBeach2.jpg)",

      }
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("tailwind-scrollbar"),
    // require("@tailwindcss/line-clamp"),
  ],
};
