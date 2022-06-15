import { Radio, View, Image } from '@tarojs/components'
import { AtInputNumber, AtModal, AtSwipeAction } from 'taro-ui'
import { formatMoney } from '@/utils/utils'
import { deleteCart } from '@/framework/api/cart/cart'
import Taro from '@tarojs/taro'
import { getOrderSetting } from '@/framework/api/order/order'
import { useEffect, useState } from 'react'
import './index.less'

interface ProductItemProps {
  product: any //商品信息
  changeProduct?: Function //商品改变事件
  delCartSuccess: Function //删除成功事件回调
  isInvalid?: boolean //是否是失效商品
}

const ProductItem = ({ product, changeProduct, delCartSuccess, isInvalid = false }: ProductItemProps) => {
  const { select, goodsNum, id, skuGoodInfo } = product
  const { image, price, specs, tags, name, stock } = product.localData
  const [maxNum, setMaxNum] = useState(5)
  const [showDelTipModal, setShowDelTipModal] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  const delCartProduct = async () => {
    const res = await deleteCart({ id, operator: '111' })
    if (res) {
      delCartSuccess && delCartSuccess([id])
    }
    setIsOpened(false)
    setShowDelTipModal(false)
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
        className="rc-swiper-action"
        options={[
          {
            text: '删除',
            style: {
              backgroundColor: '#DF6E66',
              width: '80rpx',
              textAlign: 'center',
              borderTopRightRadius: '6%',
              borderBottomRightRadius: '6%',
              marginRight: '10px',
            },
          },
        ]}
        isOpened={isOpened}
        onClick={() => {
          setShowDelTipModal(true)
          setIsOpened(true)
        }}
        areaWidth={Taro.getSystemInfoSync().windowWidth}
        maxDistance={92}
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
              color="#d33024"
              className="text-48 flex items-center transform-6"
              onClick={() => changeProduct && changeProduct(id, 'select', !select)}
              disabled={isInvalid}
            />
            <View style={{ width: '240rpx', height: '240rpx' }}>
              <Image
                style="width:240rpx; height: 240rpx;border: 1px solid #f0f0f0"
                lazyLoad
                src={image}
                onClick={() => {
                  if (!isInvalid) {
                    Taro.navigateTo({ url: `/pages/packageA/productDetail/index?id=${skuGoodInfo.id}` })
                  }
                }}
              />
            </View>
            <View className="ml-2 flex flex-col justify-between flex-grow">
              <View>
                <View
                  className="font-semibold text-30 text-black"
                  style={{ marginRight: '10px', wordBreak: 'break-word' }}
                >
                  {name}
                </View>
                <View className="mt-2 font-semibold text-black">{specs}</View>
                <View className="flex flex-row flex-wrap text-20">
                  {tags.map((el) => (
                    <View
                      className="mt-2 border border-solid rounded-md border-red mr-2 px-1 text-primary-red"
                      style={{ borderWidth: '1PX' }}
                    >
                      {el}
                    </View>
                  ))}
                </View>
              </View>
              {stock <= maxNum && !isInvalid ? (
                <View className="text-primary-red font-medium flex justify-end text-22 cart-mr-20">库存紧张</View>
              ) : null}
              {!isInvalid ? (
                <View className="flex flex-row mt-2 justify-between items-center">
                  <View className="text-primary-red font-medium text-base">{formatMoney(price)}</View>
                  <View className="cart-mr-20">
                    <AtInputNumber
                      min={1}
                      max={stock <= maxNum ? stock : maxNum}
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
              ) : null}
            </View>
          </View>
        </View>
      </AtSwipeAction>
      <AtModal
        isOpened={showDelTipModal}
        title="确认"
        cancelText="取消"
        confirmText="确定"
        onClose={() => {
          setShowDelTipModal(false)
          setIsOpened(false)
        }}
        onCancel={() => {
          setShowDelTipModal(false)
          setIsOpened(false)
        }}
        onConfirm={() => delCartProduct()}
        content="确定将已选中的商品删除吗？"
        className="error-tips-modal"
      />
    </View>
  )
}
export default ProductItem
