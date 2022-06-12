module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    backgroundImage: {
      'backimg': "url('https://i.ibb.co/FHpgbHT/cover55.jpg')",
      'logoimg': "url('https://i.ibb.co/dKzS64v/navitlogo.png')"
    },screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
    
  },
  plugins: [

  ],
}

