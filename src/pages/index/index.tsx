import { useEffect, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

const Index = () => {
  const [name, setName] = useState('')
  useEffect(() => {
    setName('zyq')
  }, [])
  return (
    <View className='index'>
        <Text>{`Hello world!${name}`}</Text>
        <Button onClick={() => {
          Taro.navigateTo({
            url: '/pages/productDetail/index'
          })
        }}>go</Button>
        <Button openType='contact'>contact</Button>
      </View>
  )
}

export default Index