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
  orderType,
  changeCheckoutVoucher,
}: {
  totalPrice: number
  tradeItems: any[]
  changeMaxDiscount: Function
  orderType: string
  changeCheckoutVoucher: Function
}) => {
  const [showNoCoupon, setShowNoCoupon] = useState(false)
  const [showVoucherModal, setShowVoucherModal] = useState(false)
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null)
  const [initVouchers, setInitVouchers] = useState<Voucher[]>([])

  //有可使用的优惠券时默认显示最高价值的优惠券
  const handleDefaultVoucher = () => {
    //1、用户未使用的优惠券列表
    //2、优惠券可用订单类型：ALL：所有订单可用 SING_ORDER：普通订单可用 NORMAL_SUBSCRIPTION：订阅订单可用
    //3、店铺型优惠券：有门槛/无门槛FIX_AMOUNT：订单总金额（不包括运费）大于等于优惠券满减金额 无门槛PERCENTAGE：直接打折
    //4、商品型优惠券：所下单商品内有该优惠券绑定的商品，有门槛/无门槛FIX_AMOUNT：所有可用该优惠券的商品的总价大于等于优惠券满减金额 无门槛PERCENTAGE：直接打折
    //5、有可用优惠券时，默认选中最高折扣的优惠券
    let canUsedVouchers: Voucher[] = []
    const notCanUseVouchers: Voucher[] = []
    cloneDeep(vouchers).map((el: Voucher) => {
      if (
        (orderType === 'FRESH_BUY' && el.orderType === 'SING_ORDER') ||
        (orderType === 'normal' && el.orderType === 'NORMAL_SUBSCRIPTION')
      ) {
        el.isCanUsed = false
      } else {
        if (el.voucherType === 'SHOP_VOUCHER' && totalPrice >= el.voucherUsePrice) {
          el = setVoucherCanUse(el, totalPrice)
        }
        if (el.voucherType === 'PRODUCT_VOUCHER') {
          const totalDiscountPrice = handleProductVoucherPrice(el)
          if (totalDiscountPrice >= el.voucherUsePrice) {
            el = setVoucherCanUse(el, totalDiscountPrice)
          }
        }
      }
      el.isCanUsed ? canUsedVouchers.push(el) : notCanUseVouchers.push(el)
      return el
    })
    canUsedVouchers = canUsedVouchers.sort((a, b) => a.maxDiscountPrice - b.maxDiscountPrice).reverse()
    if (!selectedVoucher && canUsedVouchers.length > 0) {
      changeSelectVoucher(canUsedVouchers[0], canUsedVouchers.concat(notCanUseVouchers))
    }
    setVouchers(canUsedVouchers.concat(notCanUseVouchers))
  }

  const setVoucherCanUse = (el, orderPrice) => {
    el.isCanUsed = true
    if (el.discountType === 'FIX_AMOUNT') {
      el.maxDiscountPrice = el.recurrence
        ? Math.floor(orderPrice / el.voucherUsePrice) * el.voucherPrice
        : el.voucherPrice
    } else {
      el.maxDiscountPrice = orderPrice * el.voucherPrice * 0.01
    }
    return el
  }

  //获取产品型优惠券针对当前所要购买的商品的最大优惠价格
  const handleProductVoucherPrice = (voucher) => {
    let canUsedProduct: any[] = []
    voucher.voucherGoodsRelated.map((el) => {
      const item = tradeItems.find((orderProduct) => el?.goodsId === orderProduct?.goodsId)
      if (item) {
        canUsedProduct.push(item)
      }
    })
    return canUsedProduct.reduce((prev, cur) => {
      return prev + cur?.skuGoodInfo?.goodsVariants[0].marketingPrice * cur?.goodsNum
    }, 0)
  }

  //处理selectVoucher改变后最大优惠券金额和当前vouchers值
  const changeSelectVoucher = (value, voucherList) => {
    changeMaxDiscount && changeMaxDiscount(value?.maxDiscountPrice || 0)
    setSelectedVoucher(value)
    setVouchers(
      voucherList.map((item) => {
        item.isSelect = item.id === value?.id
        return item
      }),
    )
    changeCheckoutVoucher && changeCheckoutVoucher(value?.originVoucher)
  }

  //获取优惠券列表
  const getVoucherList = async () => {
    let res = await getListVouchers()
    setVouchers(res.notUsedVouchers)
    setInitVouchers(res.notUsedVouchers)
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
    setShowVoucherModal(false)
    changeSelectVoucher(value, vouchers)
  }

  useEffect(() => {
    if (tradeItems.length > 0 && initVouchers.length > 0 && totalPrice > 0) {
      handleDefaultVoucher()
    }
  }, [totalPrice, initVouchers, tradeItems, orderType])

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
              {selectedVoucher
                ? `已选${
                    selectedVoucher.discountType === 'FIX_AMOUNT'
                      ? selectedVoucher.voucherPrice + '元'
                      : (100 - selectedVoucher.voucherPrice) / 10 + '折'
                  }优惠券`
                : '请选择优惠券'}
            </Text>
            <AtIcon value="chevron-right" size="24" color="#666666" />
          </View>
        </View>
      </View>
      {showVoucherModal ? (
        <CheckoutVoucherModal
          showVoucherModal={showVoucherModal}
          closeVoucherModal={() => setShowVoucherModal(false)}
          selectVoucher={selectVoucher}
          vouchers={vouchers}
        />
      ) : null}
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
