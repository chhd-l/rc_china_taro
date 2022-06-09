import { Radio, View, Image } from '@tarojs/components'
import { AtSwipeAction } from 'taro-ui'
import Taro from '@tarojs/taro'
import { batchDeleteCart, deleteCart } from '@/framework/api/cart/cart'
import { useAtom } from 'jotai'
import { customerAtom } from '@/store/customer'
import './index.less'

const ProductItem = ({ productList, delCartSuccess }: { productList: any[]; delCartSuccess: Function }) => {
  const [customerInfo] = useAtom(customerAtom)

  const delCartProduct = async (id) => {
    const res = await deleteCart({ id, operator: customerInfo?.nickName || 'system' })
    if (res) {
      delCartSuccess && delCartSuccess([id])
    }
  }

  const clearInvalidProduct = async () => {
    const ids = productList.map((el) => {
      return el.id
    })
    const res = await batchDeleteCart({
      ids,
      operator: customerInfo?.nickName || 'system',
    })
    if (res) {
      delCartSuccess && delCartSuccess(ids)
    }
  }

  return productList.length > 0 ? (
    <View>
      <View className="flex justify-between py-2 px-4">
        <View>失效商品{productList.length}件</View>
        <View className="text-primary-red" onClick={() => clearInvalidProduct()}>
          清空失效商品
        </View>
      </View>
      <View>
        {productList.map((item, index) => (
          <View key={index} className={`${index !== productList.length - 1 ? 'mb-2' : ''}`}>
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
              autoClose
              onClick={() => delCartProduct(item.id)}
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
                    style={{ transform: 'scale(0.6)' }}
                    color="#d33024"
                    className="text-48 flex items-center"
                    disabled
                  />
                  <View style={{ width: '240rpx', height: '240rpx' }}>
                    <Image
                      style="width:240rpx; height: 240rpx;border: 1px solid #f0f0f0"
                      lazyLoad
                      src={item.localData.image}
                    />
                  </View>
                  <View className="ml-2 flex flex-col justify-between flex-grow">
                    <View>
                      <View className="font-semibold text-30 text-black">{item.localData.name}</View>
                      <View className="mt-2 font-semibold text-black">{item.localData.specs}</View>
                      <View className="flex flex-row flex-wrap text-20">
                        {item.localData.tags.map((el) => (
                          <View className="mt-2 border border-solid rounded-md border-red mr-2 px-1 text-primary-red">
                            {el}
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </AtSwipeAction>
          </View>
        ))}
      </View>
    </View>
  ) : null
}
export default ProductItem
