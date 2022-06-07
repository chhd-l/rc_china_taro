import { Image, View } from '@tarojs/components'
import NavBar from '@/components/common/Navbar'
import { AtSearchBar } from 'taro-ui'
import { useState } from 'react'
import Taro from '@tarojs/taro'

const NavBarForList = () => {
  const [keyword, setKeyword] = useState('')
  const handleClick = () => {
    Taro.navigateTo({ url: '/pages/packageA/search/index' })
  }
  return (
    <NavBar>
      <View className="flex items-center px-2 product-list-navbar">
        <Image
          style={{ width: '8.2rem' }}
          className="h-8"
          src="https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/Home_Logo.png"
        />
        <View className="flex-1 text-28" onClick={handleClick}>
          <AtSearchBar
            className="cat-milk-cans"
            value={keyword}
            disabled
            placeholder="猫奶罐"
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
