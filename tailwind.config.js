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
        rc_9B9C9D: '#9B9C9D',
        rc_FAFBFC: '#FAFBFC',
      },
      textColor: {
        titleGray: '#A7A7A7',
        textGray: '#999999',
        borderGray: '#EEEEEE',
        rc_ECECEC: '#ECECEC',
        rc_222222: '#222222',
      },
      fontSize: {
        rc16: '16px',
        rc18: '18px',
        rc20: '20px',
        rc22: '22px',
        rc26: '26px',
        rc28: '28px',
        rc30: '30px',
        rc48: '48px',
        rc54: '54px',
        rc64: '64px',
      },
      width: {
        'rc3-10': '30%',
        rc190: '190px',
        rc124: '124px',
      },
      height: {
        rc22: '22px',
        rc26: '26px',
        rc38: '38px',
        rc190: '190px',
        rc96: '96px',
      },
      lineHeight: {
        rc22: '22px',
        rc26: '26px',
        rc38: '38px',
        rc96: '96px',
      },
      margin: {
        rc150: '150px',
      },
      padding: {
        rc150: '150px',
        rc120: '120px',
      },
    },
  },
}
