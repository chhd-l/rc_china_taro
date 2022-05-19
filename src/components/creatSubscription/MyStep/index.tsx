import IconFont from "@/iconfont"
import { Text, View } from "@tarojs/components"
import './index.less'


const MyStep = ({ current, items }) => {

  return <View className="flex flex-row items-center justify-center">
    {
      items.map((item, index) => (
        <View className="flex flex-col" key={item.title}>
          <View className="flex flex-row" key={item.step}>
            <View className="flex flex-col">
              <IconFont name={index <= current ? item.checked : item.unchecked} size={120} />
              <View className="flex flex-col items-center">
                <Text className="textSize">{item.title}</Text>
                <Text className="textSize">{item.desc}</Text>
              </View>
            </View>
            {index !== (items.length - 1) && <IconFont name={index <= current ? 'buzhoujiange' : 'buzhoujiange0'} size={120} />}
          </View>
        </View>
      ))
    }

  </View>
}

export default MyStep