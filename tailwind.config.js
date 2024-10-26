module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'snow-fall': 'snow 10s linear infinite',
      },
      keyframes: {
        snow: {
          '0%': { transform: 'translateY(-10vh)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      },
      backgroundImage: {
        'xmas-pattern': "url('/api/placeholder/100/100')",
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}