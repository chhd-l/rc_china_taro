import { View, Text } from '@tarojs/components'
import { AtFloatLayout, AtIcon } from 'taro-ui'
import { useEffect, useState } from 'react'
import { Voucher } from '@/framework/types/voucher'
import VoucherItem from '@/components/voucher/voucherItem'
import { getVouchers } from '@/framework/api/voucher/voucher'
import './index.less'

const VoucherModal = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [showReceiveVoucher, setShowReceiveVoucher] = useState(false)

  const getVoucherList = async () => {
    const res = await getVouchers()
    setVouchers(res)
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

  //领取优惠券
  const receiveVoucher = (voucher: Voucher) => {
    console.log('received voucher', voucher)
  }

  useEffect(() => {
    getVoucherList()
  }, [])

  return (
    <>
      <View className="flex flex-row bg-gray-eee py-2">
        <View className="flex flex-row" style={{ width: '80%' }}>
          <Text className="text-primary-red border-red border-r-1 border-l-0 border-t-0 border-b-0 border-solid pr-2">
            本店活动
          </Text>
          <View className="px-2 truncate" style={{ width: '70%' }}>
            {handleVoucherName()}
          </View>
        </View>
        <View className="text-primary-red flex items-center justify-end text-end w-full" onClick={() => setShowReceiveVoucher(true)}>
          <Text>领券</Text>
          <AtIcon value="chevron-right" size="20" color="#d33024" />
        </View>
      </View>
      <AtFloatLayout
        isOpened={showReceiveVoucher}
        onClose={() => {
          setShowReceiveVoucher(false)
        }}
        className="rc-voucher-float-layout"
        scrollY
      >
        <View>
          <View className="flex">
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
                receiveVoucher={receiveVoucher}
              />
            ))}
          </View>
        </View>
      </AtFloatLayout>
    </>
  )
}

export default VoucherModal
