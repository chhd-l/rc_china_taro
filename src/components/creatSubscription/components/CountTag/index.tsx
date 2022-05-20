import { View } from "@tarojs/components"
import './index.less'



const CountTag = ({ count }) => {


  return <View className="countTag">
    X{count}包
</View>
}


export default CountTag