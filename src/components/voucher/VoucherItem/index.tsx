import { Radio, View, Text } from '@tarojs/components'
import { getCurrencyCode } from '@/utils/utils'
import { Voucher } from '@/framework/types/voucher'
import { AtButton } from 'taro-ui'
import './index.less'

interface VoucherItemProps {
  voucher: Voucher
  receiveVoucher?: Function //立即领取触发事件
  applyVoucher?: Function //立即使用触发事件
  backgroundImageUrl: string //背景图片
  changeSelected?: Function //单选触发事件
  showRadioSelect?: boolean //是否展示单选按钮
  priceClass?: string //价格相关样式
  showApplyBtn?: boolean //是否需要立即使用btn
  showReceiveBtn?: boolean //是否需要立即领取btn
  expiredTimeClass?: string //有效期样式
  expiredTimeText?: string //有效期文字内容
  applyBtnClass?: string //立即使用样式
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
  applyBtnClass = '',
}: VoucherItemProps) => {
  const { voucherPrice, voucherName, voucherDescription, expiredTime, isSelect } = voucher

  return (
    <View
      className={`${!showRadioSelect ? 'justify-center' : ''} flex flex-col w-full h-28 mb-2`}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
      }}
      onClick={() => {
        if (showRadioSelect) {
          changeSelected && changeSelected(voucher, !isSelect)
        }
      }}
    >
      {showRadioSelect ? (
        <View className="flex justify-end pr-2 pt-1">
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
      <View className="flex flex-row items-center text-24">
        <View className={`${priceClass} flex flex-col justify-center items-center`} style={{ width: '30%' }}>
          <View>
            <Text>{getCurrencyCode()}</Text>
            <Text className="text-4xl font-medium">{voucherPrice}</Text>
          </View>
          <View className="mt-3">{voucherName}</View>
        </View>
        <View className="flex flex-col pl-6 flex-grow">
          <View className={`${priceClass} text-28`}>{voucherDescription}</View>
          <View className={`${expiredTimeClass}`}>{expiredTimeText}</View>
          <View className={`${expiredTimeClass}`}>{expiredTime}</View>
          <View className="mt-2 flex justify-end pr-4">
            {showApplyBtn ? (
              <AtButton
                className={`${
                  applyBtnClass ? applyBtnClass : 'rc-received-voucher-button'
                }  flex justify-end items-center`}
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
