import { Text, View } from "@tarojs/components"
import { PropsWithChildren } from "@tarojs/taro"
import classNames from 'classNames'
import './index.less'

type CountTagProps = PropsWithChildren<{
  type?: 'center'
}>

const CountTag = ({ children, type }: CountTagProps) => {

  const childrenClassNames = classNames({ 'ml-2': type !== 'center', 'mr-1': type === 'center' })

  return <View className={`countTag ${type !== 'center' ? 'text-left' : 'text-center'} `}>
    <Text className={childrenClassNames}>X{children}</Text>
  </View>
}


export default CountTag