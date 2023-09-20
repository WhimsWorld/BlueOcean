const withMT = require('@material-tailwind/react/utils/withMT');

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      heading: ['Karla', 'sans-serif'],
      body: ['Merriweather', 'sans-serif'],
    },
    extend: {
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
