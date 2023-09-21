const withMT = require('@material-tailwind/react/utils/withMT');

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
