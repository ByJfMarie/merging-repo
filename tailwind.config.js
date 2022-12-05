/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': {'min': '0px', 'max': '639px'},
      // => @media (min-width: 0px and max-width: 639px) { ... }

      'sm': {'min': '640px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... } 

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }

      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    
    extend: {
      fontFamily: {
        "montserrat": ["Montserrat", "sans-serif"]
      },
      textColor: {
        "primary": "#2db4eb"
      },
      borderColor: {
        "primary": "#2db4eb"
      },
      backgroundColor: {
        "primary": "#2db4eb"
      }
    },
  },
  plugins: [require("tailwindcss-flip")],
}
