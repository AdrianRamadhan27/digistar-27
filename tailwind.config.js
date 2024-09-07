/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      colors: {
        primary: {
          DEFAULT: '#c2c7cf', 
        },
        secondary: {
          DEFAULT: '#f0f0f0',
        },
        accent: {
          DEFAULT: '#e81255',
          hover: '#e34f7e',
        },
        primarytext: {
          DEFAULT: '#091e42'
        }
      },
    },
  },
  plugins: [],
}

