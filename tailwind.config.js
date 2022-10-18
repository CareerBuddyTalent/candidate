/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        cooper: ['Cooper', 'sans-serif'],
        GTWalsheimPro: ['"GT Walsheim Pro"'],
      },
      colors: {
        'brand-black': '#090E11',
        'brand-primary': '#F0386A',
        'brand-sky': '#007AB9',
        'brand-light': '#FAFAFA',
        'brand-placholder': '#012F3266',
        'brand-card': '#6D2E5D0D',
        'brand-color': '#6D2E5D',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide')],
};
