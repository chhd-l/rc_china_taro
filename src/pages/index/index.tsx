import HomeNarBar from "@/components/home/HomeNavbar";
import { useEffect, useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import './index.less'


const Index = () => {
  const [name, setName] = useState('')
  useEffect(() => {
    setName('zyq')
  }, [])
  return (
    <View className='index'>
      <HomeNarBar />
        <Text>{`Hello world!${name}`}</Text>
        <Button onClick={() => {
          Taro.navigateTo({
            url: '/pages/productDetail/index'
          })
        }}>go</Button>
        <Button className='w-10 flex flex-row' openType='contact'>contact</Button>
        <AtButton type='primary' onClick={() => {
          Taro.navigateTo({
            url: '/pages/productDetail/index'
          })
        }}>contact</AtButton>
      </View>
  )
}

export default Index
