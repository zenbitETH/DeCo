module.exports = {
  important: true,
  mode: 'jit',
  purge: [
    './pages/**/*.{js,jsx,ts,tsx,vue}',
    './components/**/*.{js,jsx,ts,tsx,vue}'
  ],
  media: false, // or 'media' or 'class'
  variants: {},
  theme: {
    extend: {
      colors: {
        deco: {
          200: '#fdb04e',
          100: '#119195'
        },

        night: {
          300: '#014875',
          200: '#01304E',
          100: '#01243b'
        },

        screens: {
          fhd: '1920px',
          qhd: '2560px',
          uhd: '3840px',
          xxl: '1800px',
          md: '600px'
        },
        spacing: {
          88: '22rem',
          '2/3': '66.666667%',
          '11/12': '91.67%'
        },

        borderRadius: {
          tf: '25px'
        },
        fontFamily: {
          Poppins: ['Poppins, sans-serif'],
          exo: ['Exo 2'],
          lex: ['Lexend'],
          bal: ['Baloo 2']
        },

        container: {
          center: true,
          padding: '1rem'
        }
      }
    }
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
