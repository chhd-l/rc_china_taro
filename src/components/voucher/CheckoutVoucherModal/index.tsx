import { View, Radio } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'
import { Voucher } from '@/framework/types/voucher'
import { VOUCHER_NO_RECEIVED, VOUCHER_RECEIVED } from '@/lib/constants'
import { formatMoney } from '@/utils/utils'
import { useState } from 'react'
import './index.less'

const VoucherItem = ({ voucher, changeSelected }: { voucher: Voucher; changeSelected: Function }) => {
  const { isSelect, voucherPrice, voucherName, voucherDescription, expiredTime, isExpired } = voucher
  const [selected, setSelected] = useState(voucher.isSelect)

  return (
    <View
      className="flex flex-col w-full h-32"
      style={{
        backgroundImage: `url(${isExpired ? VOUCHER_RECEIVED : VOUCHER_NO_RECEIVED})`,
        backgroundSize: 'cover',
      }}
    >
      <View className="flex justify-end px-8 pt-4 pb-2">
        {!isExpired ? (
          <Radio
            value=""
            checked={selected}
            style={{ transform: 'scale(0.6)' }}
            color="#d33024"
            className="text-48 flex items-center"
            onClick={() => {
              setSelected(!selected)
              changeSelected && changeSelected(voucher, !isSelect)
            }}
          />
        ) : null}
      </View>
      <View className="flex flex-row items-center">
        <View className="flex flex-col pl-6 items-center">
          <View className="text-primary-red text-48">{formatMoney(voucherPrice)}</View>
          <View className="text-primary-red">{voucherName}</View>
        </View>
        <View className="flex flex-col px-8 flex-grow">
          <View className="text-primary-red">{voucherDescription}</View>
          <View className="text-gray-400 text-24">有效期</View>
          <View className="text-gray-400">{expiredTime}</View>
        </View>
      </View>
    </View>
  )
}

const VoucherModal = ({
  showVoucherModal,
  closeVoucherModal,
  selectVoucher,
  vouchers,
}: {
  showVoucherModal: boolean
  closeVoucherModal: Function
  selectVoucher: Function
  vouchers: Voucher[]
}) => {
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null)

  const changeSelected = (value, isSelect) => {
    if (isSelect) {
      setSelectedVoucher(value)
    } else {
      setSelectedVoucher(null)
    }
  }

  return (
    <AtFloatLayout
      isOpened={showVoucherModal}
      onClose={() => {
        closeVoucherModal && closeVoucherModal()
      }}
      className="rc-voucher-float-layout"
      scrollY
    >
      <View>
        <View className="flex justify-between">
          <View
            className=""
            onClick={() => {
              closeVoucherModal && closeVoucherModal()
            }}
          >
            取消
          </View>
          <View
            className="text-primary-red"
            onClick={() => {
              selectVoucher && selectVoucher(selectedVoucher)
            }}
          >
            确定
          </View>
        </View>
        <View>
          {vouchers.map((item) => (
            <VoucherItem voucher={item} changeSelected={changeSelected} />
          ))}
        </View>
      </View>
    </AtFloatLayout>
  )
}

export default VoucherModal
