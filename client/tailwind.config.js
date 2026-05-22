/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      blue: {
        100: '#8fa3b7',
        300: '#436588',
        500: '#10466f',
        700: '#003358',
      },
      yellow: {
        100: '#fff9c0',
        300: '#fcec16',
        500: '#ffd900',
        700: '#ffc000',
      },
      teal: {
        100: '#84d2d3',
        300: '#26b1af',
        500: '#009591',
        700: '#00756f',
      },
      purple: {
        100: '#b382bc',
        300: '#813090',
        500: '#610879',
        700: '#410268',
      },
      orange: {
        100: '#ffddb0',
        300: '#ffaf49',
        500: '#fe8d00',
        700: '#f47101',
      },
      red: {
        100: '#d780a0',
        300: '#bd2a63',
        500: '#a50048',
        700: '#7c003e',
      },
      white: {
        100: '#fafaff',
        300: '#f5f5fa',
        500: '#efeff4',
        700: '#e2e2e7',
      },
      black: {
        100: '#6e6e6e',
        300: '#5b5b5b',
        500: '#3c3c3c',
        700: '#1c1c1c',
      },
    },
  },
  plugins: [],
}
