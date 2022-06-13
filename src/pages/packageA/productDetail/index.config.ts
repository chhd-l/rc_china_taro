export default definePageConfig({
  navigationBarTitleText: '商品详情',
  navigationStyle: 'custom',
  components: ['pendant'],
  enableShareAppMessage: true,
  usingComponents: {
    "pendant": "plugin-private://wx2b03c6e691cd7370/components/pendant/pendant"
  },
})
