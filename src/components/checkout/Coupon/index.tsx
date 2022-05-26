import { View, Text, Image } from '@tarojs/components'
import { AtIcon, AtModal } from 'taro-ui'
import { useEffect, useState } from 'react'
import { VOUCHER_ORDER_ICON } from '@/lib/constants'
import CheckoutVoucherModal from '@/components/voucher/CheckoutVoucherModal'
import { Voucher } from '@/framework/types/voucher'
import { getListVouchers } from '@/framework/api/voucher/voucher'
import cloneDeep from 'lodash.cloneDeep'

const Coupon = ({
  totalPrice,
  tradeItems,
  changeMaxDiscount,
}: {
  totalPrice: number
  tradeItems: any[]
  changeMaxDiscount: Function
}) => {
  const [showNoCoupon, setShowNoCoupon] = useState(false)
  const [showVoucherModal, setShowVoucherModal] = useState(false)
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null)
  const [initVouchers, setInitVouvhers] = useState<Voucher[]>([])

  //有可使用的优惠券时默认显示最高价值的优惠券
  const handleDefaultVoucher = () => {
    //1、未使用优惠券列表
    //2、店铺型优惠券满足满减金额
    //3、商品型优惠券，所下单商品内有可用该优惠券且满足满减金额
    const records = cloneDeep(vouchers)
      .map((el: Voucher) => {
        if (el.voucherType === 'SHOP_VOUCHER' && totalPrice >= el.voucherUsePrice) {
          el.isCanUsed = true
        }
        if (el.voucherType === 'PRODUCT_VOUCHER') {
          let canUsedProduct: any[] = []
          el.goodsInfoIds.map((goodsInfoId) => {
            const item = tradeItems.find((orderProduct) => goodsInfoId === orderProduct?.skuGoodInfo?.id)
            if (item) {
              canUsedProduct.push(item)
            }
          })
          const totalDiscountPrice = canUsedProduct.reduce((prev, cur) => {
            return prev + cur?.goodsVariants[0].marketingPrice
          }, 0)
          el.isCanUsed = totalDiscountPrice >= el.voucherUsePrice
        }
        return el
      })
      .sort((a, b) => Number(a.isCanUsed) - Number(b.isCanUsed))
      .reverse()
    console.log('1111111', records)
    const maxVoucher = cloneDeep(records)
      .filter((el) => el?.isCanUsed)
      ?.sort((a, b) => a.voucherPrice - b.voucherPrice)
    if (!selectedVoucher && maxVoucher.length > 0) {
      changeMaxDiscount && changeMaxDiscount(handleMaxDiscount(maxVoucher[0]))
      setSelectedVoucher(maxVoucher[0])
      setVouchers(
        records.map((item) => {
          item.isSelect = item.id === maxVoucher[0].id
          return item
        }),
      )
    } else {
      setVouchers(records)
    }
  }

  //计算当前优惠券可优惠最大金额
  const handleMaxDiscount = (voucher) => {
    if (voucher?.voucherType === 'SHOP_VOUCHER') {
      return voucher.recurrence ? (totalPrice / voucher.voucherUsePrice) * voucher.voucherPrice : voucher.voucherPrice
    }
    if (voucher?.voucherType === 'PRODUCT_VOUCHER') {
      let canUsedProduct: any[] = []
      voucher.goodsInfoIds.map((goodsInfoId) => {
        const item = tradeItems.find((orderProduct) => goodsInfoId === orderProduct?.skuGoodInfo?.id)
        if (item) {
          canUsedProduct.push(item)
        }
      })
      const totalDiscountPrice = canUsedProduct.reduce((prev, cur) => {
        return prev + cur?.goodsVariants[0].marketingPrice
      }, 0)
      return voucher.recurrence
        ? (totalDiscountPrice / voucher.voucherUsePrice) * voucher.voucherPrice
        : voucher.voucherPrice
    }
    return 0
  }

  //获取优惠券列表
  const getVoucherList = async () => {
    let res = await getListVouchers()
    setVouchers(res.notUsedVouchers)
    setInitVouvhers(res.notUsedVouchers)
  }

  //打开优惠券选择弹框或者提示无可用优惠券
  const selectCoupon = () => {
    if (vouchers.length === 0) {
      setShowNoCoupon(true)
    } else {
      setShowVoucherModal(true)
    }
  }

  //手动选择优惠券
  const selectVoucher = (value) => {
    console.log(222222)
    setShowVoucherModal(false)
    setSelectedVoucher(value)
    changeMaxDiscount && changeMaxDiscount(handleMaxDiscount(value) || 0)
    setVouchers(
      vouchers.map((el) => {
        el.isSelect = el.id === value?.id
        return el
      }),
    )
  }

  useEffect(() => {
    if (tradeItems.length > 0 && initVouchers.length > 0 && totalPrice > 0) {
      handleDefaultVoucher()
    }
  }, [totalPrice, initVouchers, tradeItems])

  useEffect(() => {
    getVoucherList()
  }, [])

  return (
    <View className="bg-white mt-2 pl-2 py-2 rounded ">
      <View className="flex flex-row justify-between items-center" onClick={() => selectCoupon()}>
        <View className="text-30 flex flex-row items-center">
          <Image className="w-6 h-6 mr-2" src={VOUCHER_ORDER_ICON} />
          优惠券
        </View>
        <View>
          <View>
            <Text className="text-xs text-gray-400">
              {selectedVoucher ? `已选${selectedVoucher.voucherPrice}元优惠券` : '请使用优惠券'}
            </Text>
            <AtIcon value="chevron-right" size="24" color="#666666" />
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
        className="rc-error-tips-modal-one"
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
