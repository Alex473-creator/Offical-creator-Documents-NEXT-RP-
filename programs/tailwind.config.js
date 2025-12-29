/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mvd-blue': '#1e3a5f',
        'mvd-light': '#2d4a7c',
        'mvd-accent': '#ff6b35',
        'mvd-secondary': '#4ecdc4',
      },
      fontFamily: {
        'times': ['Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}