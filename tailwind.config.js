/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--bg-primary) / <alpha-value>)',
        secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
        accent: '#1479E8',
        'brand-navy': '#061947',
        'brand-blue': '#1479E8',
        'brand-green': '#16B84E',
        'brand-orange': '#FF7A1A',
        'brand-purple': '#6D4BE8',
        muted: 'rgb(var(--text-muted) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
