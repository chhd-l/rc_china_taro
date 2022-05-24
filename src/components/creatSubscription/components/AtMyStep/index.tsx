import IconFont from "@/iconfont"
import { Text, View } from "@tarojs/components"
import './index.less'


const items = [
  { checked: 'xuanzechongwu', unchecked: 'xuanzechongwu0', title: '第一步', desc: '选择宠物' },
  { checked: 'dingzhitaocan', unchecked: 'dingzhitaocan0', title: '第二步', desc: '定制套餐' },
  { checked: 'querentaocan', unchecked: 'querentaocan0', title: '第三步', desc: '确认套餐' }] as const

type AtMyStepProps = {
  current: number
}

const AtMyStep = ({ current }: AtMyStepProps) => {

  return <View className="flex flex-row items-center justify-center">
    {
      items.map((item, index) => (
        <View className="flex flex-col" key={item.title}>
          <View className="flex flex-row" >
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

export default AtMyStep