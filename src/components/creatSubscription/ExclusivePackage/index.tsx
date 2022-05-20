import { View } from "@tarojs/components"
import { useState } from "react"
import { AtIcon, AtTag } from "taro-ui"
import Card from "../Card"
import AtMyRadio from "../components/AtMyRadio"
import CountTag from "../components/CountTag"
import './index.less'

const checkboxOption = [{
  value: '1',
  label: '普通',

}, {
  value: '2',
  label: '100天'
},]
const ExclusivePackage = () => {
  const [current, setCurrent] = useState('1')
  return <View><View className="m-4">
    <View className="font-bold text-base ">胖胖的专属套餐</View>
    <View className="borderLine" />
    <View className="p-6">
      <View className="w-full bg-yellow-400 h-60 relative" >
        <CountTag count={10} />
      </View>
      <View className="font-bold text-sm my-2">皇家 英国短毛猫成猫全价粮2KG</View>
      <View className="flex direction-row items-center">
        <AtTag type='primary' className="bg-primary-red text-white" size='small'><AtIcon value='clock' size='10' color='#ffff'></AtIcon>商城价</AtTag>
        <view className="text-primary-red font-bold text-sm">￥183/包</view>
        <View className="line-through text-textGray text-xs ml-2">￥286</View>
      </View>
    </View>
    <View className="flex direction-row items-center">
      <View className=' text-textGray text-rc22'>新鲜度</View>
      <AtMyRadio options={checkboxOption} value={current} onClick={(val) => setCurrent(val)} />

    </View>
  </View>
    <Card />
  </View>

}

export default ExclusivePackage