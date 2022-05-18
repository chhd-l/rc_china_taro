import { View } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'
import { Voucher } from '@/framework/types/voucher'
import { AtButton } from 'taro-ui'
import { VOUCHER_NO_RECEIVED, VOUCHER_RECEIVED } from '@/lib/constants'
import './index.less'

const VoucherItem = ({
  voucher,
  receiveVoucher,
  applyVoucher,
}: {
  voucher: Voucher
  receiveVoucher: Function
  applyVoucher: Function
}) => {
  const { isReceived, voucherPrice, voucherName, voucherDescription, expiredTime } = voucher
  return (
    <View
      className="flex flex-row items-center w-full h-32 mb-2"
      style={{
        backgroundImage: `url(${isReceived ? VOUCHER_RECEIVED : VOUCHER_NO_RECEIVED})`,
        backgroundSize: 'cover',
      }}
    >
      <View className="flex flex-col pl-6 items-center">
        <View className="text-primary-red text-48">{formatMoney(voucherPrice)}</View>
        <View className="text-primary-red">{voucherName}</View>
      </View>
      <View className="flex flex-col px-8 flex-grow">
        <View className="text-primary-red">{voucherDescription}</View>
        <View className="text-gray-400 text-24">{isReceived ? '失效时间' : '领券时间'}</View>
        <View className="text-gray-400">{expiredTime}</View>
        <View className="mt-2 flex justify-end">
          {isReceived ? (
            <AtButton
              className="rc-received-voucher-button flex justify-end items-center"
              onClick={() => {
                applyVoucher && applyVoucher(voucher)
              }}
            >
              立即使用
            </AtButton>
          ) : (
            <AtButton
              className="rc-no-receive-voucher-button flex justify-end items-center"
              onClick={() => {
                receiveVoucher && receiveVoucher(voucher)
              }}
            >
              立即领取
            </AtButton>
          )}
        </View>
      </View>
    </View>
  )
}

export default VoucherItem
