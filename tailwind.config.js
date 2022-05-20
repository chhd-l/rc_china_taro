module.exports = {
  prefixer: false,
  compile: false,
  globalUtility: false,
  darkMode: 'media',
  corePlugins: {
    preflight: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false,
    space: false,
    placeholderColor: false,
    placeholderOpacity: false,
  },
  theme: {
    extend: {
      colors: {
        'primary-red': '#d33024',
      },
      backgroundColor: {
        'gray-eee': '#eeeeee',
        'gray-fb': '#fbfbfb',
        'gray-card': '#FFFFFF',
      },
      textColor: {
        titleGray: '#A7A7A7',
        textGray: '#999999',
        borderGray: '#EEEEEE',
      },
      fontSize: {
        rc20: '20px',
        rc22: '22px',
        rc28: '28px',
        rc30: '30px',
      },
    },
  },
}
