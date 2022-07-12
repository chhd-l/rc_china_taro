module.exports = {
  env: {
    NODE_ENV: '"stg"'
  },
  appid:"wxb61580d49d4cb259",
  defineConstants: {
    toBePaidTemplateId:'"0IfjTn0CTcEfKZOUV_0Ogca0kEyDj3QR3-44P6CFUX4"',//订单待支付提醒
    deliverGoodsTemplateId:'"UrLIKpXTvOqYy1rs9bhZ0ckAT7GKYj5ukNQsvToaEzI"',//订单发货提醒
    newActivitiesTemplateId:'"HK2dlFHkL_WhoO6wknkuZAD8PcnM5nSyQxuTSuBwrvA"',//订单发货提醒
    couponExpiredTemplateId:'"0s9wQ2VAr1RorQBFW6obyjn-khBtOKg7xw3eWTgV60Y"',//优惠券过期提醒
    wechatFollow:'"https://mp.weixin.qq.com/s/AkHjEwaLonRAz8T6glZAEg"', //去关注公众号
  },
  mini: {},
  h5: {
    /**
     * WebpackChain 插件配置
     * @docs https://github.com/neutrinojs/webpack-chain
     */
    // webpackChain (chain) {
    //   /**
    //    * 如果 h5 端编译后体积过大，可以使用 webpack-bundle-analyzer 插件对打包体积进行分析。
    //    * @docs https://github.com/webpack-contrib/webpack-bundle-analyzer
    //    */
    //   chain.plugin('analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])

    //   /**
    //    * 如果 h5 端首屏加载时间过长，可以使用 prerender-spa-plugin 插件预加载首页。
    //    * @docs https://github.com/chrisvfritz/prerender-spa-plugin
    //    */
    //   const path = require('path')
    //   const Prerender = require('prerender-spa-plugin')
    //   const staticDir = path.join(__dirname, '..', 'dist')
    //   chain
    //     .plugin('prerender')
    //     .use(new Prerender({
    //       staticDir,
    //       routes: [ '/pages/index/index' ],
    //       postProcess: (context) => ({ ...context, outputPath: path.join(staticDir, 'index.html') })
    //     }))
    // }
  }
}
