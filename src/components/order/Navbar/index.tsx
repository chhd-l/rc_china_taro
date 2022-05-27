import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'

const NarBar = ({ num }: { num: number }) => {
  const [paddingTop, setPaddingTop] = useState<any>(0)

  useEffect(() => {
    //将状态栏高度挂载全局，方便自定义页面导航栏
    Taro.getSystemInfo({}).then((res) => {
      console.log(res.statusBarHeight)
      setPaddingTop(res.statusBarHeight)
    })
  }, [])

  return (
    <View className="w-full z-10 bg-white" style={{ paddingTop: paddingTop + 'px', position: 'fixed', top: '0' }}>
      <View className="mt-2 mb-2 text-center">全部</View>
    </View>
  )
}
export default NarBar
