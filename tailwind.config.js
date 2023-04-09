/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // Ensure these match with .storybook/preview.js
    screens: {
      xs: '375px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },

    fontFamily: {
      sans: 'Helvetica, sans-serif',
      // mono: 'Helvetica, sans-serif',
    },
    extend: {
      borderRadius: { xl: '1.21rem' },
      colors: {
        bone: {
          200: '#FDF9ED',
          400: '#FBF1D6',
          600: '#AAA69C',
          800: '#58554B',
        },
        gray: {
          100: '#E9E9E9',
          300: '#DDDDDD',
          500: '#CCCCCC',
          700: '#545454',
        },
      },
    },
  },
  plugins: [],
};
