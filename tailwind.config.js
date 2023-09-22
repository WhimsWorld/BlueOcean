const withMT = require('@material-tailwind/react/utils/withMT');

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      heading: ['Karla', 'sans-serif'],
      body: ['Merriweather', 'sans-serif'],
      logo: ['Handlee', 'cursive'],
      norican: ['Norican', 'cursive'],
      poiret: ['Poiret One', 'cursive'],
    },
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
        croissant: ['Croissant One', 'cursive'],
        merienda: ['Merienda', 'cursive'],
      },
      colors: {
        whimsipink: '#F4E3ED',
        whimsidarkblue: '#101A4B',
        whimsihotpink: '#DE369D',
        whimsilightblue: '#7B8CDE',
        whimsiorange: '#F9A03F',
      },
      backgroundColor: {
        papercolor: '#faf4e3',
      },
    },
  },
  plugins: [],
});
