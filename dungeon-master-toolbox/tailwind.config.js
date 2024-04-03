/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      'dmt': '/fonts/MedievalSharp.ttf'
      },
      fontSize:{
        '3xl': ['48px']
      },
      colors: {
        'site-background': '#FFFAFA',
        'defaultText': '#120002',
        'defaultButton': '#FFEBED',
      },
      screens:{
        md: '860px'
      }
    },
  },
  plugins: [],
}

