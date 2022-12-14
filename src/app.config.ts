import { useGlobalIconFont } from './iconfont/helper'

export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/productList/index',
    'pages/subscription/index',
    'pages/account/index',
    'pages/cart/index',
  ],
  plugins: {
    'live-player-plugin': {
      version: '1.3.2',
      provider: 'wx2b03c6e691cd7370',
    },
  },
  subpackages: [
    {
      root: 'pages/packageA',
      pages: [
        'search/index',
        'moreProducts/index',
        'productDetail/index',
        'checkout/index',
        'orderList/index',
        'orderDetail/index',
        'welfare/index',
        'officialAccount/index'
      ],
    },
    {
      root: 'pages/packageB',
      pages: [
        'addressManage/index',
        'breedList/index',
        'newAddress/index',
        'petList/index',
        'createSubscription/index',
        'voucherList/index',
        'deliveryManagement/index',
        'deliveryProgress/index',
        'recommendationList/index',
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#bfbfbf',
    selectedColor: '#d81e06',
    backgroundColor: '',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/icons/icon-home.png',
        selectedIconPath: 'assets/icons/icon-home-selected.png',
      },
      {
        pagePath: 'pages/productList/index',
        text: '商城',
        iconPath: 'assets/icons/icon-mall.png',
        selectedIconPath: 'assets/icons/icon-mall-selected.png',
      },
      {
        pagePath: 'pages/subscription/index',
        text: '订阅',
        iconPath: 'assets/icons/icon-subscription.png',
        selectedIconPath: 'assets/icons/icon-subscription-selected.png',
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: 'assets/icons/icon-cart.png',
        selectedIconPath: 'assets/icons/icon-cart-selected.png',
      },
      {
        pagePath: 'pages/account/index',
        text: '我的',
        iconPath: 'assets/icons/icon-account.png',
        selectedIconPath: 'assets/icons/icon-account-selected.png',
      },
    ],
    position: 'bottom',
  },
  lazyCodeLoading: 'requiredComponents',
  // eslint-disable-next-line react-hooks/rules-of-hooks
  usingComponents: Object.assign(useGlobalIconFont()),
})

