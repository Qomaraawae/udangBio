/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f0',
          100: '#ffe0de',
          200: '#ffc5c2',
          300: '#ff9b96',
          400: '#ff6b64',
          500: '#ff4433',
          600: '#ed2f1d',
          700: '#c82212',
          800: '#a51f11',
          900: '#882015',
        }
      }
    },
  },
  plugins: [],
}