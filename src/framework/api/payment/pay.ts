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
    Taro.requestSubscribeMessage({
      tmplIds: ['otY6R389-5izW9df-1-0zNsEnWq59GxEnsD5BYYvLqQ', 'xGYlhYSx6T9tgzdLSiSGzYgRB3LC0ZZxzgFI4xrdIzc'],
      success: async (res) => {
        if (res['otY6R389-5izW9df-1-0zNsEnWq59GxEnsD5BYYvLqQ'] && res['xGYlhYSx6T9tgzdLSiSGzYgRB3LC0ZZxzgFI4xrdIzc']) {
          params.amount = 1
          const { pay: data } = await ApiRoot.orders().pay({ body: params })
          if (data.success) {
            const { wxPaymentRequest, payInfo } = data
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
              async success() {
                await ApiRoot.orders().syncOrder({
                  input: {
                    payInfoId: payInfo.id,
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
              complete() {},
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
