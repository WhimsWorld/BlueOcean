const withMT = require('@material-tailwind/react/utils/withMT');

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        zoomIn: 'zoomIn 20s infinite',
      },
      keyframes: {
        zoomIn: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      fontFamily: {
        norican: ['Norican', 'cursive'],
        poiret: ['Poiret One', 'cursive'],
      },
      colors: {
        whimsipink: '#F4E3ED',
        whimsidarkblue: '#101A4B',
        whimsihotpink: '#DE369D',
        whimsilightblue: '#7B8CDE',
        whimsiorange: '#F9A03F',
      },
    },
  },
  plugins: [],
});
