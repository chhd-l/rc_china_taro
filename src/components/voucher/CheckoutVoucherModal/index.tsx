import { View } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'
import { Voucher } from '@/framework/types/voucher'
import { VOUCHER_NO_RECEIVED, VOUCHER_INVALID } from '@/lib/constants'
import { useState } from 'react'
import VoucherItem from '@/components/voucher/VoucherItem'
import './index.less'

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
        <View className="flex justify-between mb-2">
          <View
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
            <VoucherItem
              voucher={item}
              changeSelected={changeSelected}
              backgroundImageUrl={item.isExpired ? VOUCHER_INVALID : VOUCHER_NO_RECEIVED}
              showRadioSelect={!item.isExpired}
              priceClass={item.isExpired ? 'text-white' : 'text-primary-red'}
              expiredTimeClass={item.isExpired ? 'text-white' : 'text-gray-400'}
            />
          ))}
        </View>
      </View>
    </AtFloatLayout>
  )
}

export default VoucherModal
