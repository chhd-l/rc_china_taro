import { View } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'
import { Voucher } from '@/framework/types/voucher'
import { AtButton } from 'taro-ui'
import VoucherNoReceive from '@/assets/img/voucher-no-receive.png'
import VoucherReceived from '@/assets/img/voucher-received.png'
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
  return (
    <View
      className="flex flex-row items-center w-full h-32"
      style={{
        backgroundImage: `url(${voucher.isReceived ? VoucherReceived : VoucherNoReceive})`,
        backgroundSize: 'cover',
      }}
    >
      <View className="flex flex-col pl-6 items-center">
        <View className="text-primary-red text-48">{formatMoney(voucher.voucherPrice)}</View>
        <View className="text-primary-red">{voucher.voucherName}</View>
      </View>
      <View className="flex flex-col px-8 flex-grow">
        <View className="text-primary-red">{voucher.voucherDescription}</View>
        <View className="text-gray-400 text-24">{voucher.isReceived ? '失效时间' : '领券时间'}</View>
        <View className="text-gray-400">{voucher.expiredTime}</View>
        <View className="mt-2 flex justify-end">
          {voucher.isReceived ? (
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
