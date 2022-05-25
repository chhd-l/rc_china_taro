import { View } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'
import { Voucher } from '@/framework/types/voucher'
import { VOUCHER_NO_RECEIVED, VOUCHER_INVALID } from '@/lib/constants'
import { useEffect, useState } from 'react'
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
  const [voucherList, setVoucherList] = useState<Voucher[]>([])

  const changeSelected = (value, isSelect) => {
    if (isSelect) {
      setSelectedVoucher(value)
      setVoucherList(
        voucherList.map((el) => {
          el.isSelect = el.id === value.id
          return el
        }),
      )
    } else {
      setSelectedVoucher(null)
      setVoucherList(
        voucherList.map((el) => {
          el.isSelect = false
          return el
        }),
      )
    }
  }

  useEffect(() => {
    setVoucherList(vouchers)
  }, [vouchers])

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
          {voucherList.map((item) => (
            <VoucherItem
              voucher={item}
              changeSelected={changeSelected}
              backgroundImageUrl={!item?.isCanUsed ? VOUCHER_INVALID : VOUCHER_NO_RECEIVED}
              showRadioSelect={item?.isCanUsed}
              priceClass={!item?.isCanUsed ? 'text-white' : 'text-primary-red'}
              expiredTimeClass={!item?.isCanUsed ? 'text-white' : 'text-gray-400'}
            />
          ))}
        </View>
      </View>
    </AtFloatLayout>
  )
}

export default VoucherModal
