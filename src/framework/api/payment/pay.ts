import Taro from '@tarojs/taro'
import ApiRoot from '../fetcher'

interface PayInput {
  customerId: string
  customerOpenId: string
  tradeId: string
  tradeNo: string
  tradeDescription: string
  payWayId: string
  amount: number
  currency: string
  storeId: string
  operator: string
}

export const pay = async ({ params, success, fail, paymentRequest }: { params: PayInput; success?: Function; fail?: Function; paymentRequest?: any }) => {
  try {
    Taro.requestSubscribeMessage({
      tmplIds: ['otY6R389-5izW9df-1-0zNsEnWq59GxEnsD5BYYvLqQ', 'xGYlhYSx6T9tgzdLSiSGzYgRB3LC0ZZxzgFI4xrdIzc'],
      success: async (res) => {
        if (res['otY6R389-5izW9df-1-0zNsEnWq59GxEnsD5BYYvLqQ'] && res['xGYlhYSx6T9tgzdLSiSGzYgRB3LC0ZZxzgFI4xrdIzc']) {
          let payInfoId = '', timeStamp = '', nonceStr = '', packageStr = '', signType: any = '', paySign = ''
          if (paymentRequest?.success) {
            console.info('.....paymentRequest,isSubscription', paymentRequest)
            timeStamp = paymentRequest.wxPaymentRequest.timeStamp
            nonceStr = paymentRequest.wxPaymentRequest.nonceStr
            packageStr = paymentRequest.wxPaymentRequest.package
            signType = paymentRequest.wxPaymentRequest.signType
            paySign = paymentRequest.wxPaymentRequest.paySign
            payInfoId = paymentRequest.payInfo.id
          } else {

            const { pay: data } = await ApiRoot.orders().pay({ body: params })
            const { wxPaymentRequest, payInfo } = data
            if (data.success) {
              timeStamp = wxPaymentRequest.timeStamp
              nonceStr = wxPaymentRequest.nonceStr
              packageStr = wxPaymentRequest.package
              signType = wxPaymentRequest.signType
              paySign = wxPaymentRequest.paySign
              payInfoId = payInfo.id
            }
            console.info('.....notSubscription', wxPaymentRequest)
          }
          if (timeStamp) {
            Taro.requestPayment({
              // 时间戳
              timeStamp,
              // 随机字符串
              nonceStr,
              // 统一下单接口返回的 prepay_id 参数值
              package: packageStr,
              // 签名类型
              signType,
              // 签名
              paySign,
              // 调用成功回调
              async success() {
                await ApiRoot.orders().syncOrder({
                  input: {
                    payInfoId,
                    storeId: '12345678',
                    operator: 'zyq',
                  },
                })
                success && success()
              },
              // 失败回调
              fail() {
                fail && fail()
              },
              // 接口调用结束回调
              complete() { },
            })
          }
        }
      },
      fail: (res) => {
        console.log(res)
      },
    })
  } catch (e) {
    console.log(e)
  }
}
