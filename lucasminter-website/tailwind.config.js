module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      s: '12px',
      m: '16px',
      l: '32px',
      xl: '64px',
      smHeader: '50px'
    },
    extend: {
      colors: {
        'background': '#F2FEFF',
        'title-start': '#2CECFF',
        'title-end': '#1F76FF',
        'image-gradient': '#07292D'
      },
      backgroundImage: {
        'title-image': "url('/images/cookingImage.png')"
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide')
  ],
}
