import { normalizeTags } from '@/framework/api/lib/normalize'
import IconFont from '@/iconfont'
import { recommendInfoAtom, recommendProductAtom } from '@/store/subscription'
import { View, Text, Image } from '@tarojs/components'
import { useAtom } from 'jotai'
import CountTag from '../components/CountTag'
import './index.less'

const Purchased = () => {
  const [recommendProduct] = useAtom(recommendProductAtom)
  const {
    productVariantInfo: { variants, productAttributeValueRel, productAsserts, name },
    giftList,
    couponList,
  } = recommendProduct
  console.log('Purchased', variants)

  return (
    <View className="m-4">
      <View className="font-bold text-base ">您已购买</View>
      <View className="borderLine" />
      <View className="h-45 w-full flex flex-row my-4 items-center">
        <View className=" w-38 mr-2 relative">
          <Image
            className="w-full "
            mode="widthFix"
            src={variants?.[0]?.defaultImage || productAsserts?.[0]?.artworkUrl}
          />
          <CountTag type="center">{recommendProduct.quantity!}</CountTag>
        </View>
        <View className="flex-1">
          <View className="font-bold text-rc26 text-rc_222222">{variants?.[0]?.name || name}</View>
          <View className="bg-rc_9B9C9D text-white text-rc18 w-rc124 h-rc26 leading-rc26 text-center my-2">
            逐包随单发货
          </View>
          {normalizeTags(productAttributeValueRel, variants?.[0]?.feedingDays).map((item) => (
            <View className="text-rc22 text-textGray" key={item}>
              {item}
            </View>
          ))}
          <View className="flex flex-row items-center justify-between">
            <View className="my-2">
              <Text className="text-rc20 text-primary-red">￥</Text>
              <Text className="font-bold text-primary-red text-rc28">{variants?.[0]?.subscriptionPrice}</Text>
              {/* <Text className="text-primary-red text-rc20">.00</Text> */}
            </View>
            <View className="text-textGray text-rc22">x{recommendProduct.quantity}</View>
          </View>
        </View>
      </View>
      <View style={{ borderTop: '1rpx solid #e8e8e8', marginBottom: '18rpx' }}></View>
      {giftList?.map((list) => (
        <View className="flex flex-col" key={list.id}>
          <View className="flex flex-row items-center">
            <View className="w-rc190 h-rc190  mr-2 relative">
              <Image
                className="w-full"
                mode="widthFix"
                src={list.variants?.[0]?.defaultImage || list.productAsserts?.[0]?.artworkUrl}
              />
              {/* <CountTag type="center" >{list.quantityRule === 'DOUBLE_OF_SKU_NUMBER' ? recommendProduct.quantity! * 2 : list.quantity}</CountTag> */}
              <CountTag type="center">{list.quantity}</CountTag>
            </View>
            <View className="flex-1">
              <View className="font-bold text-rc26 text-rc_222222">
                {list.variants?.[0]?.name || list.name}
              </View>
              {/* <View className="font-bold text-rc26 text-rc_222222 mt-1">不可同时享受</View> */}
              <View className="flex flex-row items-center">
                <IconFont name="a-Frame1" size={73} />
                <Text className="bg-rc_9B9C9D text-white text-rc18 w-rc124 h-rc26 leading-rc26 text-center ml-1">
                  {' '}
                  {list.quantityRule !== 'FIRST_DELIVERY_FIXED_NUMBER' ? '逐包随单发货' : '一次性发货'}
                </Text>
              </View>
              <View className="flex justify-between">
                <View className="text-primary-red">
                  <Text className="text-rc20 text-primary-red">￥</Text>
                  <Text className="text-rc28 font-bold">0</Text>
                  <Text className="text-rc20 font-bold">.00</Text>
                </View>
                <View className="text-textGray text-rc22">x{list.quantity}</View>
              </View>
            </View>
          </View>
        </View>
      ))}
      {couponList?.map((list) => (
        <View className="flex flex-col" key={list.couponInfo?.id}>
          <View className="flex flex-row items-center">
            <View className="w-rc190 h-rc190  mr-2 relative">
              <Image className="w-full" mode="widthFix" src={list.couponInfo?.voucherDefaultImage} />
              <CountTag type="center">{list.quantity}</CountTag>
            </View>
            <View className="flex-1">
              <View className="font-bold text-rc26 text-rc_222222">{list.couponInfo?.voucherName}</View>
              <View className="flex flex-row items-center">
                <IconFont name="a-Frame1" size={73} />
                <Text className="bg-rc_9B9C9D text-white text-rc18 w-rc124 h-rc26 leading-rc26 text-center ml-1">
                  一次性发货
                  {/* {list.quantityRule !== 'FIRST_DELIVERY_FIXED_NUMBER' ? '一次性发货' : '逐包随单发货'} */}
                </Text>
              </View>
              <View className="text-20 text-gray-400 ">
                {list.voucherDescription ? `券描述:${list.voucherDescription}` : ''}
              </View>
              <View className="flex justify-between">
                <View className="text-primary-red">
                  <Text className="text-rc20 text-primary-red">￥</Text>
                  <Text className="text-rc28 font-bold">0</Text>
                  <Text className="text-rc20 font-bold">.00</Text>
                </View>
                <View className="text-textGray text-rc22">x{list.quantity}</View>
              </View>
            </View>
          </View>
        </View>
      ))}

      <View className="mt-8 flex flex-row justify-end items-end">
        <Text className=" text-rc_222222 mb-1 text-rc22">
          <Text className="line-through">原价￥{recommendProduct.originalPrice}</Text>，套餐折后价
        </Text>
        <Text className="text-primary-red font-bold text-rc54 mr-4 ml-1">￥{recommendProduct.discountPrice}</Text>
      </View>
    </View>
  )
}

export default Purchased
