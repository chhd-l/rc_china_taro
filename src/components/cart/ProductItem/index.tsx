import { Radio, View, Image } from '@tarojs/components'
import { AtInputNumber, AtSwipeAction } from 'taro-ui'
import { formatMoney } from '@/utils/utils'
import { deleteCart } from '@/framework/api/cart/cart'
import Taro from '@tarojs/taro'
import { getOrderSetting } from '@/framework/api/order/order'
import { useEffect, useState } from 'react'
import './index.less'

const ProductItem = ({
  product,
  changeProduct,
  delCartSuccess,
}: {
  product: any
  changeProduct: Function
  delCartSuccess: Function
}) => {
  const { select, goodsNum, id, skuGoodInfo } = product
  const { image, price, specs, tags, name } = product.localData
  const [maxNum, setMaxNum] = useState(5)

  const delCartProduct = async () => {
    console.log('333333')
    await deleteCart({ id, operator: '111' })
    delCartSuccess && delCartSuccess()
  }

  const getMaxNum = async () => {
    const res = await getOrderSetting()
    const maxNumSetting = res.filter((item) => item.code === 'order_最大购买物品')
    const maxCartNum = maxNumSetting.length > 0 ? Number(maxNumSetting[0].context) : 5
    setMaxNum(maxCartNum)
  }

  useEffect(() => {
    getMaxNum()
  }, [])

  return (
    <View>
      <AtSwipeAction
        options={[
          {
            text: '删除',
            style: {
              backgroundColor: '#d33024',
              width: '40rpx',
            },
          },
        ]}
        autoClose
        onClick={delCartProduct}
        areaWidth={Taro.getSystemInfoSync().windowWidth}
        maxDistance={60}
      >
        <View
          style={{
            width: Taro.getSystemInfoSync().windowWidth + 'px',
          }}
        >
          <View className="w-full flex flex-row items-stretch px-2 py-3">
            <Radio
              value="选中"
              checked={select}
              style={{ transform: 'scale(0.6)' }}
              color="red"
              className="text-48 flex items-center"
              onClick={() => changeProduct && changeProduct(id, 'select', !select)}
            />
            <Image
              mode='aspectFit'
              style="width:240rpx; height: 240rpx;border: 1px solid #f0f0f0"
              lazyLoad
              src={image}
              onClick={() => {
                Taro.redirectTo({ url: `/pages/packageA/productDetail/index?id=${skuGoodInfo.id}` })
              }}
            />
            <View className="ml-2 flex flex-col justify-between flex-grow">
              <View>
                <View className="font-semibold text-30 text-black">{name}</View>
                <View className="mt-2 font-semibold text-black">{specs}</View>
                <View className="flex flex-row flex-wrap text-20">
                  {tags.map((el) => (
                    <View className="mt-2 border border-solid rounded-md border-red mr-2 px-1 text-primary-red">{el}</View>
                  ))}
                </View>
              </View>
              <View className="flex flex-row mt-2 justify-between items-center">
                <View className="text-primary-red font-medium text-base">{formatMoney(price)}</View>
                <View style={{ marginRight: '20px' }}>
                  <AtInputNumber
                    min={1}
                    max={maxNum}
                    step={1}
                    value={goodsNum}
                    onChange={(value) => {
                      changeProduct && changeProduct(id, 'goodsNum', value)
                    }}
                    type="number"
                    className="rc-input-number"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </AtSwipeAction>
    </View>
  )
}
export default ProductItem
