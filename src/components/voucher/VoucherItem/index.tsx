import { Radio, View, Text } from '@tarojs/components'
import { getCurrencyCode } from '@/utils/utils'
import { Voucher } from '@/framework/types/voucher'
import { AtButton } from 'taro-ui'
import './index.less'

interface VoucherItemProps {
  voucher: Voucher
  receiveVoucher?: Function
  applyVoucher?: Function
  backgroundImageUrl: string
  changeSelected?: Function
  showRadioSelect?: boolean
  priceClass?: string
  showApplyBtn?: boolean
  showReceiveBtn?: boolean
  expiredTimeClass?: string
  expiredTimeText?: string
}

const VoucherItem = ({
  backgroundImageUrl,
  voucher,
  receiveVoucher,
  applyVoucher,
  changeSelected,
  showRadioSelect = false,
  priceClass = 'text-primary-red',
  showApplyBtn = false,
  showReceiveBtn = false,
  expiredTimeClass = 'text-gray-400',
  expiredTimeText = '有效期',
}: VoucherItemProps) => {
  const { voucherPrice, voucherName, voucherDescription, expiredTime,isSelect } = voucher

  return (
    <View
      className={`${!showRadioSelect ? 'justify-center' : ''} flex flex-col w-full h-32 mb-2`}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {showRadioSelect ? (
        <View className="flex justify-end pr-2 py-2">
          <Radio
            value=""
            checked={isSelect}
            style={{ transform: 'scale(0.6)' }}
            color="#d33024"
            className="text-48 flex items-center"
            onClick={() => {
              changeSelected && changeSelected(voucher, !isSelect)
            }}
          />
        </View>
      ) : null}
      <View className="flex flex-row items-center">
        <View className={`${priceClass} flex flex-col pl-3 items-center`}>
          <View >
            <Text className="text-42">{getCurrencyCode()}</Text>
            <Text className="text-5xl font-medium">{voucherPrice}</Text>
          </View>
          <View>{voucherName}</View>
        </View>
        <View className="flex flex-col pl-8 flex-grow">
          <View className={`${priceClass}`}>{voucherDescription}</View>
          <View className={`${expiredTimeClass} text-24`}>{expiredTimeText}</View>
          <View className={`${expiredTimeClass}`}>{expiredTime}</View>
          <View className="mt-2 flex justify-end pr-3">
            {showApplyBtn ? (
              <AtButton
                className="rc-received-voucher-button flex justify-end items-center"
                onClick={() => {
                  applyVoucher && applyVoucher(voucher)
                }}
              >
                立即使用
              </AtButton>
            ) : null}
            {showReceiveBtn ? (
              <AtButton
                className="rc-no-receive-voucher-button flex justify-end items-center"
                onClick={() => {
                  receiveVoucher && receiveVoucher(voucher)
                }}
              >
                立即领取
              </AtButton>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  )
}

export default VoucherItem
