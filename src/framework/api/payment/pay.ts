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

export const pay = async ({ params, success, fail }: { params: PayInput; success?: Function; fail?: Function }) => {
  try {
    const { pay: data } = await ApiRoot.orders().pay({ body: params })
    if (data.success) {
      const { wxPaymentRequest } = data
      Taro.requestPayment({
        // 时间戳
        timeStamp: wxPaymentRequest.timeStamp,
        // 随机字符串
        nonceStr: wxPaymentRequest.nonceStr,
        // 统一下单接口返回的 prepay_id 参数值
        package: wxPaymentRequest.package,
        // 签名类型
        signType: wxPaymentRequest.signType,
        // 签名
        paySign: wxPaymentRequest.paySign,
        // 调用成功回调
        success() {
          success && success()
        },
        // 失败回调
        fail() {
          fail && fail()
        },
        // 接口调用结束回调
        complete() {},
      })
    }
  } catch (e) {
    console.log(e)
  }
}
