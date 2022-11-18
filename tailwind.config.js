/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        albertSmall: ['Albert Small'],
        albert: ['Albert'],
        albertSemiBold: ['Albert Semi Bold'],
        albertBold: ['Albert Bold'],
        albertExtraBold: ['AlbertExtra'],
      },
      colors: {
        'brand-black': '#050001',
        'brand-primary': '#FF2449',
        'brand-sky': '#007AB9',
        'brand-light': '#E2E3E9',
        'brand-placholder': '#012F3266',
        'brand-card': '#6D2E5D0D',
        'brand-color': '#6D2E5D',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide')],
};
