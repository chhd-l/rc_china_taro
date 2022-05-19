import { petInfoAtom } from "@/store/subscription"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { AtTag } from "taro-ui"
import IconFont from '@/iconfont';
import './index.less'

const CardTypeList = [
  { value: 0, title: '季卡', desc: '低至3.9元/天', count: 3, price: 442, day: 114, line: 519, iconName: 'jiduka' },
  { value: 1, title: '半年卡', desc: '低至3.9元/天', count: 5, price: 692, day: 190, line: 865, iconName: 'bannianka' },
  { value: 2, title: '年卡', desc: '低至3.9元/天', count: 10, price: 1298, day: 380, line: 1730, iconName: 'nianka' }]
const Card = () => {
  const [cardType, setCardType] = useState(0)
  const [petInfo, setPetInfo] = useAtom(petInfoAtom)

  useEffect(() => {
    setPetInfo({ ...petInfo, discountPrice: CardTypeList[0].price, originalPrice: CardTypeList[0].line })

  }, [])

  return <View className="my-4 mx-1 titleBorder">
    <View className="flex flex-row ">
      {
        CardTypeList.map((item, index) => (
          <View key={item.value} className={` flex-1 pt-2 cardBox ${cardType === index && 'cardBox_checked'}`} onClick={() => {
            setCardType(index)
            setPetInfo({ ...petInfo, discountPrice: item.price, originalPrice: item.line })

          }}>
            <View className='flex flex-row text-xl font-bold items-center'>
              <IconFont name={item.iconName} size={50} />
              <Text>{item.title}</Text>
            </View>
            <View className="lowAsDay">{item.desc}</View>
          </View>
        ))
      }

    </View>
    <View className="flex flex-row py-4 px-3 cardContentBorder">
      {
        CardTypeList.map((item, index) => (
          <View key={item.value} className="flex-1 rounded-md cardChild" onClick={() => {
            setCardType(index)
            setPetInfo({ ...petInfo, discountPrice: item.price, originalPrice: item.line })

          }}>
            <View className={` pt-1 pb-4 cardContent ${index == cardType && 'cardContent_checked'}`}>

              <View className="h-4 confirmIcon">{
                index == cardType && <IconFont name="xingzhuangjiehe" size={40} />}
              </View>

              <View className={` items-center  flex flex-col`}>
                <AtTag type='primary' circle className={`mx-1 cardTag ${index == cardType && 'cardTag_checked'} `}>{item.count}包订阅价</AtTag>
                <View>
                  <Text>￥</Text>
                  <Text className="text-xl font-bold ">{item.price}</Text>
                </View>
                <View className="line-through textSize">
                  <Text>￥</Text>
                  <Text >{item.line}</Text>
                </View>

              </View>

            </View>
            <View className="text-gray-400 edibleBorder text-center">
              <Text className="textSize ">可食用:</Text>
              <Text className={`font-bold text-sm ${index == cardType && 'edibleDay'}`}>{item.day}天</Text>
            </View>
          </View>

        ))
      }

    </View>
  </View>
}

export default Card