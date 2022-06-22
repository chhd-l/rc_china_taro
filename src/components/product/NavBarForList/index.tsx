import { ScrollView, View } from '@tarojs/components'
import NavBar from '@/components/common/Navbar'
import { AtSearchBar } from 'taro-ui'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { floorList } from '@/lib/product'
import IconFont from '@/iconfont'
import './index.less'

const NavBarForList = ({
  setFloorId,
  floorActiveId,
  setFloorActiveId,
  MyPets,
  onScrollFooList,
  scrollLeft,
  scrollLeftOpen,
  setShowPendant,
}: any) => {
  const [keyword, setKeyword] = useState('')
  const { system } = Taro.getSystemInfoSync()
  const systemType = system.indexOf('Android') > -1
  const [Left, setLeft] = useState<null | number>(null)
  const menuButtonInfo = Taro.getMenuButtonBoundingClientRect()
  console.info('menuButtonInfo', menuButtonInfo)
  const handleNavClick = ({ id }) => {
    setFloorId(id)
    setFloorActiveId(id)
  }

  useEffect(() => {
    setLeft(scrollLeft || null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setShowPendant])

  // const [keyword, setKeyword] = useState('猫奶罐')
  const handleClick = () => {
    Taro.navigateTo({ url: '/pages/packageA/search/index' })
  }
  return (
    <NavBar isCustom isAutoHeight>
      <View className={`flex items-center px-2 product-list-navbar w-full ${systemType ? 'isandroid' : 'isios'}`}>
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
        <View className="ml-4" style={{ width: menuButtonInfo?.width || '6.5rem' }} />
      </View>
      <View className={`relative ${!MyPets && 'hidden'}`} style={{ height: '100rpx', backgroundColor: 'red' }}>
        <ScrollView
          className="whitespace-nowrap FloorNav bg-white flex h-full"
          enableFlex
          scrollX
          // scroll-left={Left}
          onScroll={(v) => {
            setLeft(v.detail.scrollLeft)
            onScrollFooList(v.detail.scrollLeft)
          }}
        >
          <View className="text-xs h-full flex">
            {floorList.map((floor, idx) => (
              <View
                key={idx}
                onClick={() => {
                  handleNavClick(floor)
                }}
                style={{
                  fontSize: '26rpx',
                  background:
                    floorActiveId === floor.id
                      ? 'linear-gradient(rgba(255,255,255),rgba(255,255,255),rgb(210, 210, 210))'
                      : 'rgb(230, 0, 0)',
                }}
                className={`inline-block px-2 flex flex-col items-center justify-center h-full ${
                  floorActiveId === floor.id ? 'font-medium text-red-600' : 'text-white'
                }`}
              >
                <IconFont name={floor.icon} size={40} color={`${floorActiveId === floor.id ? 'red' : '#fff'}`} />
                {floor.label}
              </View>
            ))}
          </View>
        </ScrollView>
        <View
          className="FloorNavIcon h-full items-center absolute top-0 right-0 px-1"
          style={{
            borderTopLeftRadius: '0.5rem',
            background: 'linear-gradient(rgba(255,255,255),rgba(255,255,255),rgb(210, 210, 210))',
            display: scrollLeftOpen ? 'flex' : 'none',
            zIndex: '99',
          }}
        >
          <IconFont name="gengduo1" size={44} />
        </View>
      </View>
    </NavBar>
  )
}
export default NavBarForList
