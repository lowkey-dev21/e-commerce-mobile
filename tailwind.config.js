/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#F4A94E',
          light: '#FFF3E4',
        },
        inactive: '#C5C5C5',
      },
      fontFamily: {
        sans: ['DMSans_400Regular'],
        medium: ['DMSans_500Medium'],
        bold: ['DMSans_700Bold'],
      },
    },
  },
  plugins: [],
};
