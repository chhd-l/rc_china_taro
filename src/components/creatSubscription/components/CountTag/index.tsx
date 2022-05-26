import { Text, View } from "@tarojs/components"
import './index.less'

type CountTagProps = {
  count: number
}

const CountTag = ({ count }: CountTagProps) => {


  return <View className="countTag">
    <Text className="ml-2">X{count}包</Text>
  </View>
}


export default CountTag