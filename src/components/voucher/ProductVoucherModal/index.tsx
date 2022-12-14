import { View, Text } from '@tarojs/components'
import { AtFloatLayout, AtIcon, AtMessage, AtModal } from 'taro-ui'
import { useEffect, useState } from 'react'
import { Voucher } from '@/framework/types/voucher'
import VoucherItem from '@/components/voucher/VoucherItem'
import { getPdpVouchers, receiveVoucher } from '@/framework/api/voucher'
import { VOUCHER_NO_RECEIVED, VOUCHER_RECEIVED } from '@/lib/constants'
import Taro from '@tarojs/taro'
import { useAtom } from 'jotai'
import { authLoginOpenedAtom } from '@/components/consumer/AuthLogin'
import './index.less'

const ProductVoucherModal = ({ productId }: { productId: string }) => {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [showReceiveVoucher, setShowReceiveVoucher] = useState(false)
  const [showSuccessReceive, setShowSuccessReceive] = useState(false)
  const [modalTipText, setModalTipText] = useState('')
  const [, setAuthLoginOpened] = useAtom(authLoginOpenedAtom)

  const getVoucherList = async () => {
    console.log('aaaaaaa', productId)
    const res = await getPdpVouchers({ productId,storeId:"12345678" })
    setVouchers(res.sort((a, b) => a.isReceived - b.isReceived))
  }

  //用户领取商品优惠券
  const consumerReceiveVoucher = async (voucher: Voucher) => {
    console.log('received voucher', voucher)
    const res = await receiveVoucher({
      voucherId: voucher.id,
    })
    if (res.result) {
      setModalTipText('领取成功')
      setShowSuccessReceive(true)
      setVouchers(
        vouchers
          .map((el) => {
            if (el.id === voucher.id) {
              el.isReceived = true
            }
            return el
          })
          .sort((a, b) => Number(a.isReceived) - Number(b.isReceived)),
      )
    } else {
      //该优惠券已领取完之后重新刷新数据
      if (res.errorCode === 'E0611920100' || res.errorCode === 'E06201' || res.errorCode === 'EG701210') {
        setModalTipText('优惠券已领完')
        setShowSuccessReceive(true)
        await getVoucherList()
      }
    }
  }

  useEffect(() => {
    if (productId) {
      getVoucherList()
    }
  }, [productId])

  return (
    <View>
      {vouchers.length > 0 ? (
        <View className="flex flex-row bg-gray-fb py-2 text-26">
          <View className="flex flex-row w-full keep-all">
            <Text className="text-primary-red border-red border-r-1 border-l-0 border-t-0 border-b-0 border-solid pr-2">
              本店活动
            </Text>
            <Text className="px-2 text-gray-400">
              {vouchers[0]?.voucherName} {vouchers.length > 1 ? '...' : ''}
            </Text>
          </View>
          <View
            className="text-primary-red flex items-center justify-end text-end w-full"
            onClick={() => {
              if (!Taro.getStorageSync('wxLoginRes')) {
                setAuthLoginOpened(true)
                return
              }
              setShowReceiveVoucher(true)
            }}
          >
            <Text>领券</Text>
            <AtIcon value="chevron-right" size="20" color="#d33024" />
          </View>
        </View>
      ) : null}
      <AtFloatLayout
        isOpened={showReceiveVoucher}
        onClose={() => {
          setShowReceiveVoucher(false)
        }}
        className="rc-voucher-float-layout"
        scrollY
      >
        <View className="relative">
          <View className="flex fixed top-0 right-0 left-0 h-8 z-50 bg-gray-eee px-2">
            <View className="m-auto">本店活动</View>
            <View className="flex justify-end">
              <AtIcon
                className="flex items-center"
                value="close"
                size="18"
                color="#666"
                onClick={() => setShowReceiveVoucher(false)}
              />
            </View>
          </View>
          <View className="mt-6">
            {vouchers.map((item) => (
              <VoucherItem
                voucher={item}
                applyVoucher={() => {
                  setShowReceiveVoucher(false)
                }}
                receiveVoucher={consumerReceiveVoucher}
                showApplyBtn={item.isReceived}
                showReceiveBtn={!item.isReceived}
                backgroundImageUrl={item.isReceived ? VOUCHER_RECEIVED : VOUCHER_NO_RECEIVED}
                expiredTimeText={item.isReceived ? '有效期' : '领券时间'}
              />
            ))}
          </View>
        </View>
      </AtFloatLayout>
      <AtMessage />
      <AtModal
        className="rc_modal"
        isOpened={showSuccessReceive}
        title="提示"
        confirmText="确定"
        content={modalTipText}
        onClose={() => {
          setShowSuccessReceive(false)
        }}
        onConfirm={() => setShowSuccessReceive(false)}
      />
    </View>
  )
}

export default ProductVoucherModal
