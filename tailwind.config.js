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
      sans: 'var(--font-space-grotesk)',
    },
    extend: {
      colors: {
        gray: {
          100: '#E9E9E9',
          500: '#CCCCCC',
          700: '#545454',
        },
      },
    },
  },
  plugins: [],
};
