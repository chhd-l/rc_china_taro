import { ScrollView, View } from '@tarojs/components'
import NavBar from '@/components/common/Navbar'
import { AtSearchBar } from 'taro-ui'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { floorList } from '@/lib/product'
import IconFont from '@/iconfont'
import './index.less'

const NavBarForList = ({ setFloorId, floorActiveId, setFloorActiveId, MyPets }: any) => {
  const [keyword, setKeyword] = useState('')

  const handleNavClick = ({ id }) => {
    setFloorId(id)
    setFloorActiveId(id)
  }
  // const [keyword, setKeyword] = useState('猫奶罐')
  const handleClick = () => {
    Taro.navigateTo({ url: '/pages/packageA/search/index' })
  }
  return (
    <NavBar>
      <View className="flex items-center px-2 product-list-navbar w-full">
        <View className="font-medium">商城</View>
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
      <View className={`relative ${!MyPets && 'hidden'} h-14`}>
        <ScrollView className="whitespace-nowrap FloorNav bg-white flex h-full" enableFlex scrollX scrollWithAnimation>
          <View className="sticky top-0 text-xs h-full flex">
            {floorList.map((floor, idx) => (
              <View
                key={idx}
                onClick={() => {
                  handleNavClick(floor)
                }}
                style={{
                  fontSize: '0.82rem',
                  background:
                    floorActiveId === floor.id
                      ? 'linear-gradient(rgba(255,255,255),rgba(255,255,255),rgb(210, 210, 210))'
                      : 'red',
                }}
                className={`inline-block px-2 flex flex-col items-center justify-center h-full ${floorActiveId === floor.id ? 'font-medium text-red-600' : 'text-white'
                  }`}
              >
                <IconFont name={floor.icon} size={44} color={`${floorActiveId === floor.id ? 'red' : '#fff'}`} />
                {floor.label}
              </View>
            ))}
          </View>
        </ScrollView>
        <View
          className="FloorNavIcon z-50 h-full flex items-center absolute top-0 right-0 px-1"
          style={{ borderTopLeftRadius: '0.5rem', background: 'linear-gradient(rgba(255,255,255),rgba(255,255,255),rgb(210, 210, 210))' }}
        >
          <IconFont name="gengduo1" size={44} />
        </View>
      </View>
    </NavBar>
  )
}
export default NavBarForList
