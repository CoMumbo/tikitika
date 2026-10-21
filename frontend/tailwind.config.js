/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kenya: {
          green: '#006B3F', // Deep Kenyan Green
          red: '#C8102E',   // Vibrant Kenyan Red
          black: '#000000',
          sand: '#F9F6F0',  // Warm background
        }
      }
    },
  },
  plugins: [],
}