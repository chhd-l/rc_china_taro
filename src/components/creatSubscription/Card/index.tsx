import { Text, View } from "@tarojs/components"
import { useState } from "react"
import { AtIcon, AtTag } from "taro-ui"
import './index.less'

const CardTypeList = [
  { value: 0, title: '季卡', desc: '低至3.9元/天', count: 3, price: 442, day: 114, line: 519 },
  { value: 1, title: '半年卡', desc: '低至3.9元/天', count: 5, price: 692, day: 190, line: 865 },
  { value: 2, title: '年卡', desc: '低至3.9元/天', count: 10, price: 1298, day: 380, line: 1730 }]
const Card = () => {
  const [cardType, setCardType] = useState(0)

  return <View className="my-4 mx-1 titleBorder">
    <View className="flex flex-row ">
      {
        CardTypeList.map((item, index) => (
          <View className={` flex-1 pt-2 cardBox ${cardType === index && 'cardBox_checked'}`} onClick={() => setCardType(index)}>
            <View className='at-icon at-icon-settings text-xl font-bold'>{item.title}</View>
            <View className="lowAsDay">{item.desc}</View>
          </View>
        ))
      }

    </View>
    <View className="flex flex-row py-4 px-3 cardContentBorder">
      {
        CardTypeList.map((item, index) => (
          <View className="flex-1 rounded-md cardChild">
            <View className={` pt-2 pb-4 cardContent ${index == cardType && 'cardContent_checked'}`}>
              <AtIcon value='check-circle' size='12' color='#ffff'></AtIcon>
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
            <View className="text-gray-400 edibleBorder">
              <Text className="textSize ">可食用：</Text>
              <Text className={`font-bold text-sm ${index == cardType && 'edibleDay'}`}>{item.day}天</Text>
            </View>
          </View>

        ))
      }

    </View>
  </View>
}

export default Card