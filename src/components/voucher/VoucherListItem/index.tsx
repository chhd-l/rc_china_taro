import { View } from '@tarojs/components'
import { formatMoney } from '@/utils/utils'
import { Voucher } from '@/framework/types/voucher'
import { AtButton } from 'taro-ui'
import { VOUCHER_NO_RECEIVED, VOUCHER_EXPIRED, VOUCHER_USED } from '@/lib/constants'
import Taro from '@tarojs/taro'
import './index.less'

const VoucherListItem = ({ voucher, type }: { voucher: Voucher; type: string }) => {
  const { voucherPrice, voucherName, voucherDescription, expiredTime } = voucher
  return (
    <View
      className="flex flex-row items-center w-full h-32 mt-2"
      style={{
        backgroundImage: `url(${
          type === 'EXPIRED' ? VOUCHER_EXPIRED : type === 'NOT_USED' ? VOUCHER_NO_RECEIVED : VOUCHER_USED
        })`,
        backgroundSize: 'cover',
      }}
    >
      <View className={`${type === 'NOT_USED' ? 'text-primary-red' : 'text-white'} flex flex-col pl-2 items-center`}>
        <View className="text-48">{formatMoney(voucherPrice)}</View>
        <View>{voucherName}</View>
      </View>
      <View className="flex flex-col px-10 flex-grow">
        <View className={`${type === 'NOT_USED' ? 'text-primary-red' : 'text-white'}`}>{voucherDescription}</View>
        <View className={`${type === 'NOT_USED' ? 'text-gray-400' : 'text-white'} text-24`}>有效期</View>
        <View className={`${type === 'NOT_USED' ? 'text-gray-400' : 'text-white'}`}>{expiredTime}</View>
        {type === 'NOT_USED' ? (
          <View className="mt-2 flex justify-end">
            <AtButton
              className="rc-received-voucher-button flex justify-end items-center"
              onClick={() => {
                Taro.switchTab({
                  url: '/pages/productList/index',
                })
              }}
            >
              立即使用
            </AtButton>
          </View>
        ) : null}
      </View>
    </View>
  )
}

export default VoucherListItem
