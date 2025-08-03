module.exports = {
  content: [
  './app/**/*.{js,ts,jsx,tsx}',
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
],

  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        float: 'float 6s ease-in-out infinite',
        'slow-float': 'floaty 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-5px)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      colors: {
        'maroon': '#800000'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
