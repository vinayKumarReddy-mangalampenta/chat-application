module.exports = {
  // prefix:"tw-",
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    preflight: false,
  },
  theme: {

    extend: {

      boxShadow: {
        '3xl': '0px 5px 7px rgba(58, 212, 175, 0.25)',
        '4xl': ' 10px 15px 5px 2px rgba(0,0,0,0.17)',
        '5xl': '2px 20px 18px -6px rgba(44,146,120,0.7)'
      },
      colors: {
        pink:
        {
          50: '#ffe5f8',
          100: '#f5ad11',
          200: '#fa84d8',
          300: '#f955c9',
          400: '#f830ba',
          500: '#df22a1',
          600: '#ae197d',
          700: '#7c1059',
          800: '#4a0536',
          900: '#1a0012',
        },

        green: {
          50: "#e2fcf6",
          100: "#c0f0e4",
          200: "#9be4d3",
          300: "#75d9c1",
          400: "#51cdaf",
          500: "#39b396",
          600: "#2a8c74",
          700: "#1b6453",
          800: "#0a3c32",
          900: "#001611",
          1000: "#15C098"
        },



        yellow: {
          50: '#fff7da',
          100: '#ffe7ad',
          200: '#ffd77d',
          300: '#ffc84b',
          400: '#ffb81a',
          500: '#e69e00',
          600: '#b37b00',
          700: '#815800',
          800: '#4e3500',
          900: '#1e1100',

        },
        bluelight:
        {
          50: '#e4fcf6',
          100: '#c0f1e6',
          200: '#9ae7d5',
          300: '#73dec3',
          400: '#50d5b4',
          500: '#3abc9a',
          600: '#2c9278',
          700: '#1e6955',
          800: '#0e3f33',
          900: '#001610',
        },
        text:
        {
          50: '#eafbf6',
          100: '#c6f0e5',
          200: '#a0e8d5',
          300: '#7adfc4',
          400: '#5ad7b4',
          500: '#45bd9b',
          600: '#369379',
          700: '#276956',
          800: '#173f34',
          900: '#041511',
        },
        vinni: {
          100: '#c6f0e5',
          200: '#a0e8d5',
          300: "#7EF2E5",
          400: '#155C4A',
          500: "#0E7240",
          600: "#1D6A58",
          700: "#cccccc",
          800: "#707070",
          900: "#505050"
        }


      },
      height: {
        sm: '371px',
        md: '406px',
        lg: '24px',
        xl: '48px',
        htmax: '600px',
        steps: '1000px',
        stepssm: '950px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}  