import { View, Text, Image } from '@tarojs/components'
import { AtIcon, AtModal } from 'taro-ui'
import { useEffect, useState } from 'react'
import { VOUCHER_ORDER_ICON } from '@/lib/constants'
import CheckoutVoucherModal from '@/components/voucher/CheckoutVoucherModal'
import { Voucher } from '@/framework/types/voucher'
import { getVouchers } from '@/framework/api/voucher/voucher'

const Coupon = ({ totalPrice }: { totalPrice: number }) => {
  const [showNoCoupon, setShowNoCoupon] = useState(false)
  const [showVoucherModal, setShowVoucherModal] = useState(false)
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null)

  const handleDefaultVoucher = () => {
    const canUsedVoucher = vouchers.filter((el) => !el.isExpired)
    canUsedVoucher
      .sort((a, b) => a.voucherPrice - b.voucherPrice)
      .map((el) => {
        if (totalPrice > el.voucherUsePrice && !selectedVoucher) {
          setSelectedVoucher(el)
        }
        return
      })
  }

  useEffect(() => {
    handleDefaultVoucher()
  }, [totalPrice, vouchers])

  const getVoucherList = async () => {
    const res = await getVouchers()
    setVouchers(res)
  }

  useEffect(() => {
    getVoucherList()
  }, [])

  //打开优惠券选择弹框或者提示无可用优惠券
  const selectCoupon = () => {
    if (vouchers.length === 0) {
      setShowNoCoupon(true)
    } else {
      setShowVoucherModal(true)
    }
  }

  const selectVoucher = (value) => {
    setShowVoucherModal(false)
    setSelectedVoucher(value)
    setVouchers(
      vouchers.map((el) => {
        el.isSelect = el.id === value?.id
        return el
      }),
    )
  }

  return (
    <View className="bg-white mt-2 pl-2 py-2 rounded ">
      <View className="flex flex-row justify-between items-center">
        <View className="text-30 flex flex-row items-center">
          <Image className="w-6 h-6 mr-2" src={VOUCHER_ORDER_ICON} />
          优惠券
        </View>
        <View>
          <View>
            <Text className="text-xs text-gray-400">
              {selectedVoucher ? `已选${selectedVoucher.voucherPrice}元优惠券` : '无'}
            </Text>
            <AtIcon value="chevron-right" size="24" onClick={selectCoupon} color="#666666" />
          </View>
        </View>
      </View>
      <CheckoutVoucherModal
        showVoucherModal={showVoucherModal}
        closeVoucherModal={() => setShowVoucherModal(false)}
        selectVoucher={selectVoucher}
        vouchers={vouchers}
      />
      <AtModal
        isOpened={showNoCoupon}
        title="提示"
        confirmText="确定"
        content="无可用优惠券"
        onClose={() => {
          setShowNoCoupon(false)
        }}
        onConfirm={() => setShowNoCoupon(false)}
      />
    </View>
  )
}
export default Coupon
