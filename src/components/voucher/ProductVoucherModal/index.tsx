import { View, Text } from '@tarojs/components'
import {AtFloatLayout, AtIcon, AtMessage} from 'taro-ui'
import { useEffect, useState } from 'react'
import { Voucher } from '@/framework/types/voucher'
import VoucherItem from '@/components/voucher/VoucherItem'
import { getPdpVouchers, receiveVoucher } from '@/framework/api/voucher/voucher'
import { VOUCHER_NO_RECEIVED, VOUCHER_RECEIVED } from '@/lib/constants'
import Taro from '@tarojs/taro'
import './index.less'

const ProductVoucherModal = ({ goodsId }: { goodsId: string }) => {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [showReceiveVoucher, setShowReceiveVoucher] = useState(false)

  const getVoucherList = async () => {
    console.log('aaaaaaa', goodsId)
    const res = await getPdpVouchers({ goodsId })
    setVouchers(res.sort((a, b) => a.isReceived - b.isReceived))
  }

  const handleVoucherName = () => {
    let voucherNames = ''
    vouchers.map((item, index) => {
      if (index !== vouchers.length - 1) {
        voucherNames += item.voucherName + '，'
      } else {
        voucherNames += item.voucherName
      }
    })
    return voucherNames
  }

  //用户领取商品优惠券
  const customerReceiveVoucher = async (voucher: Voucher) => {
    console.log('received voucher', voucher)
    const res = await receiveVoucher({
      voucherId: voucher.id,
    })
    if (res) {
      Taro.atMessage({
        message: '优惠券领券成功',
        type: 'success',
      })
      await getVoucherList()
    } else {
      Taro.atMessage({
        message: '系统繁忙，请稍后再试',
        type: 'error',
      })
    }
    // setShowReceiveVoucher(false)
  }

  useEffect(() => {
    if (goodsId) {
      getVoucherList()
    }
  }, [goodsId])

  return (
    <>
      {vouchers.length > 0 ? (
        <View className="flex flex-row bg-gray-fb py-2 text-26">
          <View className="flex flex-row" style={{ width: '80%' }}>
            <Text className="text-primary-red border-red border-r-1 border-l-0 border-t-0 border-b-0 border-solid pr-2 break-all">
              本店活动
            </Text>
            <View className="px-2 text-gray-400">
              {/*{handleVoucherName()}*/}
              {vouchers[0]?.voucherName} {vouchers.length>1?'...':''}
            </View>
          </View>
          <View
            className="text-primary-red flex items-center justify-end text-end w-full"
            onClick={() => {
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
        <View>
          <View className="flex mb-2">
            <View className="m-auto">本店活动</View>
            <View className="flex justify-end">
              <AtIcon value="close" size="20" color="#666" onClick={() => setShowReceiveVoucher(false)} />
            </View>
          </View>
          <View>
            {vouchers.map((item) => (
              <VoucherItem
                voucher={item}
                applyVoucher={() => {
                  setShowReceiveVoucher(false)
                }}
                receiveVoucher={customerReceiveVoucher}
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
    </>
  )
}

export default ProductVoucherModal
