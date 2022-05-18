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
      backgroundColor:{
        'gray-eee':"#eeeeee"
      }
    },
  },
}
