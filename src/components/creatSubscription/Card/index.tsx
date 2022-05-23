import { petInfoAtom } from "@/store/subscription"
import { Text, View } from "@tarojs/components"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
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
            <View className='flex flex-row  font-bold items-center  bg-gray-card'>
              <View className={`${cardType === index && "icon"}`}><IconFont name={item.iconName} size={50} /></View>
              <Text className="text-titleGray text-rc30">{item.title}</Text>
            </View>
            <View className="lowAsDay">{item.desc}</View>
          </View>
        ))
      }
    </View>
    <View className=" py-4 px-3 cardContentBorder ">
      <View className="flex flex-row ">
        {
          CardTypeList.map((item, index) => (
            <View key={item.value} className="flex-1 rounded-md cardChild" onClick={() => {
              setCardType(index)
              setPetInfo({ ...petInfo, discountPrice: item.price, originalPrice: item.line })

            }}>
              <View className={` pt-1 pb-4 cardContent ${index == cardType && 'cardContent_checked'}`}>

                <View className="h-3 confirmIcon flex relative">
                  {
                    index == cardType && <IconFont name="xuanzhong" size={30} />
                  }
                  {index === CardTypeList.length - 1 && <View className="absolute right-0" style={{ top: '-14px' }}><IconFont name="tuijian" size={70} /></View>}
                </View>

                <View className={` items-center  flex flex-col`}>
                  <View className={`mx-1 cardTag ${index == cardType && 'cardTag_checked'} `}>{item.count}包订阅价</View>
                  <View>
                    <Text className="text-rc30">￥</Text>
                    <Text className="text-rc48 font-bold">{item.price}</Text>
                  </View>
                  <View className="line-through text-rc22">
                    <Text>￥</Text>
                    <Text >{item.line}</Text>
                  </View>

                </View>

              </View>
              <View className=" edibleBorder text-center">
                <Text className="text-rc20 ">可食用:</Text>
                <Text className={`font-bold rc28 ${index == cardType && 'text-primary-red'}`}>{item.day}天</Text>
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