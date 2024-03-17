/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          1: 'var(--color-primary-1)',
        },
      },
      fontFamily: {
        'poppins': 'var(--font-poppins)',
        'fira': 'var(--font-fira)',
      },
    }
  },
  plugins: [],
}

