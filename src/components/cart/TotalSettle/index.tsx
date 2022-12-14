import { Radio, View, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { formatMoney } from '@/utils/utils'
import { AtButton, AtModal } from 'taro-ui'
// import { LineItem } from "@/framework/types/cart";
import Taro from '@tarojs/taro'
import routers from '@/routers/index'
import './index.less'

const TotalSettle = ({
  isAllSelect,
  changeAllSelect,
  selectedProduct,
}: {
  isAllSelect: boolean
  changeAllSelect: Function
  selectedProduct: any[]
}) => {
  const [isChecked, setIsChecked] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [showNoSelect, setShowNoSelect] = useState(false)

  const changeIsAllSelect = () => {
    setIsChecked(!isChecked)
    changeAllSelect && changeAllSelect(!isChecked)
  }

  const getTotalPrice = () => {
    const total = selectedProduct.reduce((prev, cur) => {
      return prev + cur.localData.price * cur.productNum
    }, 0)
    setTotalPrice(total)
  }

  const checkoutProduct = () => {
    // if (selectedProduct.length === 0) {
    //   setShowNoSelect(true);
    //   return;
    // }
    Taro.setStorage({
      key: 'select-product',
      data: JSON.stringify({ productList: selectedProduct }),
      complete: (respon) => {
        console.log(respon)
        Taro.navigateTo({ url: routers.checkout })
      },
    })
  }

  useEffect(() => {
    getTotalPrice()
  }, [selectedProduct])

  useEffect(() => {
    setIsChecked(isAllSelect)
  }, [isAllSelect])

  return (
    <View className="bg-white flex flex-row justify-between items-center py-2 w-full">
      <View>
        <Radio
          value="选中"
          checked={isChecked}
          color="#d33024"
          className="text-40 transform-6"
          onClick={() => changeIsAllSelect()}
        >
          全选
        </Radio>
      </View>
      <View className="flex flex-row items-center pr-2">
        <View className="flex flex-col">
          <View className="flex flex-row items-end">
            <Text className="text-xs text-gray-400 mb-1">合计</Text>
            <Text className="text-primary-red text-3xl mx-1 font-semibold">{formatMoney(totalPrice)}</Text>
          </View>
          {totalPrice !== 0 ? <View className="text-xs text-gray-400">优惠金额见结算页面</View> : null}
        </View>
        <AtButton
          type="primary"
          className="total-settle-button w-28 text-28"
          disabled={!selectedProduct.length}
          onClick={() => checkoutProduct()}
        >
          去结算 ({selectedProduct.length})
        </AtButton>
      </View>
      <AtModal
        isOpened={showNoSelect}
        title="提示"
        confirmText="确定"
        content="请选择需要结算的商品"
        onClose={() => {
          setShowNoSelect(false)
        }}
        onConfirm={() => setShowNoSelect(false)}
      />
    </View>
  )
}
export default TotalSettle
