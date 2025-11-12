/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: "#fcb8b8",
        pink: {
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        salon: "url('/bg-salon.jpg')",
      },
    },

    
  },

  plugins: [],
  
};




