import { addToTypeEnum } from '@/framework/types/common'
import { ProductDetailProps, SkuItemProps } from '@/framework/types/products'
import { formatMoney } from '@/utils/utils'
import { Swiper, SwiperItem, View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { AtFloatLayout, AtIcon } from 'taro-ui'
import VoucherModal from '@/components/voucher/ProductVoucherModal'
import { getOrderSetting } from '@/framework/api/order'
import './Style.less'
import { PDP_SHARE } from '@/lib/constants'

interface DetailProps {
  choosedSku: SkuItemProps
  detailInfo: ProductDetailProps
  buyCount: number
  handleShowSpec: (type: addToTypeEnum) => void
  setShowShareBtn: (type: boolean) => void
}
const Detail = ({ choosedSku, detailInfo, buyCount, handleShowSpec, setShowShareBtn }: DetailProps) => {
  const [isOpened, setIsOpened] = useState(false)
  const [currentSwiperPage, setCurrentSwiperPage] = useState(1)
  const [maxNum, setMaxNum] = useState(5)

  //获取最大可购买数量
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
    <View className="ProductDetali">
      <View className="px-2">
        <View className="swiper-box relative">
          <Swiper
            style={{ height: Taro.getSystemInfoSync().windowWidth + 'px' }}
            indicatorColor="#fff"
            indicatorActiveColor="#e2001a"
            circular
            onChange={(e) => {
              setCurrentSwiperPage(e.detail.current + 1)
            }}
            // indicatorDots
            autoplay
          >
            {choosedSku?.img?.map((el, index) => (
              <SwiperItem key={index}>
                <View className="demo-text-1">
                  <Image className="w-full h-auto" mode="widthFix" src={el} />
                </View>
              </SwiperItem>
            ))}
          </Swiper>
          <View className="swiperPage absolute bottom-0 right-0 px-1 text-xs w-6 text-center text-white">
            {currentSwiperPage}/{choosedSku?.img.length}
          </View>
        </View>
        <View className="pb-1 pt-4 flex">
          <View className="text-28 font-medium flex-1">{choosedSku?.name}</View>
          {/* <AtIcon prefixClass="fa" value="share" size="30" color="red" /> */}
          <View
            className="w-6 h-6"
            onClick={(e) => {
              console.info('....')
              setShowShareBtn(true)
              e.stopPropagation()
            }}
          >
            <Image src={PDP_SHARE} className="w-full h-full" mode="widthFix" />
          </View>
        </View>
        <View>
          {choosedSku?.tags?.map((tag, index) => (
            <Text
              key={index}
              className="border-2 border-solid border-primary-red px-1 mr-1  text-26 rounded-lg text-primary-red"
            >
              {tag}
            </Text>
          ))}
        </View>
        <View className="py-1 flex justify-between">
          <View>
            <Text className="text-primary-red pr-4 font-bold">{formatMoney(choosedSku.price)}</Text>
            <Text className="text-gray-300  text-26 line-through">{formatMoney(choosedSku.originalPrice)}</Text>
          </View>
          {maxNum > choosedSku.stock && choosedSku.stock ? (
            <Text className="text-primary-red text-24 flex justify-end">仅剩{choosedSku.stock}件</Text>
          ) : null}
        </View>
        {/*店铺优惠活动*/}
        <VoucherModal productId={detailInfo.id} />
        <View className="flex justify-between text-26 items-center">
          <View>
            已选
            {choosedSku.specText?.join(',')}，{buyCount}件
          </View>
          <View
            onClick={() => {
              handleShowSpec(addToTypeEnum.None)
            }}
            className="text-primary-red text-40 flex  items-center relative"
            style={{ top: '-5px' }}
          >
            ...
          </View>
        </View>
      </View>
      <View className="productRemark text-26 flex py-1 items-center text-center " style={{ color: '#9a9a9a' }}>
        <View className="flex-1 text-22">
          <AtIcon className="mr-1" value="check-circle" size={11} />
          正品保证
        </View>
        <View className="flex-1 text-22">
          <AtIcon className="mr-1" value="check-circle" size={11} />
          全场免邮
        </View>
        <View className="flex-1 text-22">
          <AtIcon className="mr-1" value="check-circle" size={11} />
          发货须知
          <AtIcon className="ml-1" value="help" size={11} onClick={() => setIsOpened(true)} />
        </View>
      </View>
      <View className="px-2">
        <AtFloatLayout className="flex flex-col" isOpened={isOpened} title=" " onClose={() => setIsOpened(false)}>
          <View className="detailedInformation">
            <View className="itemOne">
              <AtIcon className="mr-3" value="help" color="red" size={18} />
              <Text className="text-xs font-semibold">正品保证</Text>
            </View>
            <View className="itemTwo">皇家官方直营，100%正品保障</View>
          </View>
          <View className="detailedInformation">
            <View className="itemOne">
              <AtIcon className="mr-3" value="help" color="red" size={18} />
              <Text className="text-xs font-semibold">全场免邮</Text>
            </View>
            <View className="itemTwo">全场免邮（港澳台以及海外地区除外）</View>
          </View>
          <View className="detailedInformation">
            <View className="itemOne">
              <AtIcon className="mr-3" value="help" color="red" size={18} />
              <Text className="text-xs font-semibold">发货须知</Text>
            </View>
            <View className="itemTwo">
              <View>当天14点前完成付款即日安排发货</View>
              <View>当天14点后完成付款次日安排发货</View>
              <View>（周日及国家法定节假日顺延至下一个工作日发货，活动期间发货或有延迟敬请理解）</View>
            </View>
          </View>
        </AtFloatLayout>
      </View>
    </View>
  )
}
export default Detail
