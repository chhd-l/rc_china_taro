export default definePageConfig({
  navigationStyle: 'custom',
  navigationBarTitleText: '商城',
  components: ['pendant'],
  usingComponents: {
    "pendant": "plugin-private://wx2b03c6e691cd7370/components/pendant/pendant"
    // navbar: "@/components/home/HomeNavbar/index",
  },
})
