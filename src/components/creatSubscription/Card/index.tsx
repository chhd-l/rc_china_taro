import { recommendInfoAtom, recommendProductAtom } from "@/store/subscription"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai"
import { useState } from "react"
import IconFont from '@/iconfont';
import './index.less'

const cardInfo = {
  QUARTER: { card: '季卡', icon: 'jiduka' },
  HALF_YEAR: { card: '半年卡', icon: 'bannianka' },
  YEAR: { card: '年卡', icon: 'nianka' }
}

const Card = () => {
  const [cardType, setCardType] = useState(0)
  const [recommendInfo, setRecommendInfo] = useAtom(recommendInfoAtom)
  const [recommendProduct, setRecommendProduct] = useAtom(recommendProductAtom)
  const { cycleList } = recommendProduct

  return <View className="my-4 mx-1 titleBorder">
    <View className="flex flex-row ">
      {
        cycleList?.map((item, index) => (
          <View key={item.cycle} className={` flex-1 pt-2 cardBox ${cardType === index && 'cardBox_checked'}`} onClick={() => {
            setCardType(index)
            setRecommendInfo({ ...recommendInfo, discountPrice: item.discountPrice, originalPrice: item.originalPrice })
            setRecommendProduct({ ...recommendProduct, quantity: item.quantity, cycle: item })
          }}>
            <View className='flex flex-row  font-bold items-center  bg-gray-card'>
              <View className={`${cardType === index && "icon"}`}><IconFont name={cardInfo[item.cycle].icon} size={50} /></View>
              <Text className="text-titleGray text-rc30">{cardInfo[item.cycle].card}</Text>
            </View>
            <View className="lowAsDay">低至元/天</View>
          </View>
        ))
      }
    </View>
    <View className=" py-4 px-3 cardContentBorder ">
      <View className="flex flex-row ">
        {
          cycleList?.map((item, index) => (
            <View key={item.value} className="flex-1 rounded-md cardChild"
              onClick={() => {
                setCardType(index)
                setRecommendInfo({ ...recommendInfo, discountPrice: item.discountPrice, originalPrice: item.originalPrice })
                setRecommendProduct({ ...recommendProduct, quantity: item.quantity, cycle: item })
              }}>
              <View className={` pt-1 pb-4 cardContent ${index == cardType && 'cardContent_checked'}`}>

                <View className="h-3 confirmIcon flex relative">
                  {
                    index == cardType && <IconFont name="xuanzhong" size={30} />
                  }
                  {index === cycleList.length - 1 && <View className="absolute right-0" style={{ top: '-14px' }}><IconFont name="tuijian" size={70} /></View>}
                </View>

                <View className={` items-center  flex flex-col`}>
                  <View className={`mx-1 cardTag ${index == cardType && 'cardTag_checked'} `}>{item.quantity}包订阅价</View>
                  <View>
                    <Text className="text-rc30">￥</Text>
                    <Text className="text-rc48 font-bold">{item.discountPrice}</Text>
                  </View>
                  <View className="line-through text-rc22">
                    <Text>￥</Text>
                    <Text >{item.originalPrice}</Text>
                  </View>

                </View>

              </View>
              <View className=" edibleBorder text-center">
                <Text className="text-rc20 ">可食用:</Text>
                <Text className={`font-bold rc28 ${index == cardType && 'text-primary-red'}`}>{item.feedingDays}天</Text>
              </View>
            </View>

          ))
        }
      </View>
      <View className="flex flex-row justify-center items-center mt-6">
        <View className="divider_side" />
        <IconFont name="a-bao3" size={34} />
        <View className="text-primary-red text-rc26 mx-1">订阅期间保价</View>
        <IconFont name="wenhao01" size={20} />
        <View className="divider_side" />
      </View>

    </View>


  </View>
}

export default Card