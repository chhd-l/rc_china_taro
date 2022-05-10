import { View } from '@tarojs/components'
import NavBar from '@/components/common/Navbar'
import { AtSearchBar } from 'taro-ui'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import './index.less'
const NavBarForList = () => {
  const [keyword, setKeyword] = useState('')
  // const [keyword, setKeyword] = useState('猫奶罐')
  const handleClick = () => {
    Taro.navigateTo({ url: '/pages/packageA/search/index' })
  }
  return (
    <NavBar>
      <View className="flex items-center px-2 product-list-navbar">
        <View className="font-medium">商城</View>
        <View className="flex-1 text-28" onClick={handleClick}>
          <AtSearchBar
            value={keyword}
            disabled
            placeholder={keyword}
            onChange={(value) => {
              console.info('value', value)
              setKeyword(value)
            }}
          />
        </View>
        <View className="w-24"></View>
      </View>
    </NavBar>
  )
}
export default NavBarForList
