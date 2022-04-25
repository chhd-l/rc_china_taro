import { Radio, View, Image } from '@tarojs/components'
import { AtInputNumber, AtSwipeAction } from 'taro-ui'
import { formatMoney } from '@/utils/utils'
import { deleteCart } from '@/framework/api/cart/cart'
import Taro from '@tarojs/taro'
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

  const delCartProduct = async () => {
    console.log('333333')
    await deleteCart({ id, operator: '111' })
    delCartSuccess && delCartSuccess()
  }

  return (
    <View>
      <AtSwipeAction
        options={[
          {
            text: '删除',
            style: {
              backgroundColor: '#d33024',
              width: '40px',
            },
          },
        ]}
        autoClose
        onClick={delCartProduct}
        areaWidth={Taro.getSystemInfoSync().windowWidth + 40}
        maxDistance={40}
      >
        <View
          style={{
            width: Taro.getSystemInfoSync().windowWidth + 'px',
          }}
        >
          <View className="w-full flex flex-row items-center px-2 py-3">
            <Radio
              value="选中"
              checked={select}
              style={{ transform: 'scale(0.6)' }}
              color="red"
              className="text-48"
              onClick={() => changeProduct && changeProduct(id, 'select', !select)}
            />
            <Image
              style={{ border: '1px solid #f0f0f0', width: '100px', height: '100px' }}
              mode="widthFix"
              src={image}
              onClick={() => {
                Taro.redirectTo({ url: `/pages/packageA/productDetail/index?id=${skuGoodInfo.id}` })
              }}
            />
            <View className="ml-2 w-full">
              <View className="font-semibold text-32 text-black">{name}</View>
              <View className="mt-2 font-semibold text-black">{specs}</View>
              <View className="flex flex-row text-20 mt-2">
                {tags.map((el) => (
                  <View className="border border-solid rounded-md border-red-500 mr-2 px-1 text-red-500">{el}</View>
                ))}
              </View>
              <View className="flex flex-row mt-2 justify-between items-center">
                <View className="text-red-500 font-medium text-base">{formatMoney(price)}</View>
                <View style={{ marginRight: '20px' }}>
                  <AtInputNumber
                    min={0}
                    max={10}
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
