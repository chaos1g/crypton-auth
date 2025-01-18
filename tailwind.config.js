/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#1b1e2b',
        beige: '#212533',
        skeleton: '#6f7282',
        errorAlert: '#631c27',
        light: '#ffffff'
      }
    },
  },
  plugins: [],
}

