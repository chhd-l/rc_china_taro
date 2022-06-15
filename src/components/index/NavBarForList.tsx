import { Image, View } from '@tarojs/components'
import NavBar from '@/components/common/Navbar'
import { AtSearchBar } from 'taro-ui'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import IconFont from '@/iconfont'
import './index.less'

const NavBarForList = () => {
  const [keyword, setKeyword] = useState('')
  const [openDistMyPets, setOpenDistMyPets] = useState(false)

  const handleClick = () => {
    Taro.navigateTo({ url: '/pages/packageA/search/index' })
  }

  const distMyPets = () => {
    setOpenDistMyPets(true)
  }
  return (
    <NavBar isCustom>
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
        <View className="w-24" />
      </View>
      <View
        className={`text-xs flex flex-col items-center w-full fixed z-30 justify-center navbarforlist ${
          openDistMyPets && 'hidden'
        }`}
        style={{ top: '153rpx' }}
      >
        <View className="triangle" />
        <View className="flex items-center justify-center bg-white shadow-2xl p-2 fexidMyPets">
          点击“
          <IconFont name="a-Frame4" size={30} />”<View className="text-red-600 font-semibold">添加到我的小程序</View>
          ，订粮更方便
          <View className="ml-4" onClick={distMyPets}>
            <IconFont name="shanchu" size={24} />
          </View>
        </View>
      </View>
    </NavBar>
  )
}
export default NavBarForList
