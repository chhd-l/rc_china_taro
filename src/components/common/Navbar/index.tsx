import Taro, { getCurrentPages } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import IconFont from '@/iconfont'

interface NavbarProps {
  children?: any //自定义navbar
  isAutoHeight?: boolean
  isCustom?: boolean //是否自定义，为true的话children必传
  isNeedBack?: boolean //是否需要返回组件 tabbar页面不需要，其余的基本都需要
  navbarTitle?: string //title
  backEvent?: Function //自定义返回上一页事件
}

const NavBar = ({
  children,
  isCustom = false,
  isNeedBack = false,
  navbarTitle = '',
  backEvent,
  isAutoHeight = false,
}: NavbarProps) => {
  const [paddingTop, setPaddingTop] = useState<any>(0)

  useEffect(() => {
    //将状态栏高度挂载全局，方便自定义页面导航栏
    Taro.getSystemInfo({}).then((res) => {
      console.log(res.statusBarHeight)
      setPaddingTop(res.statusBarHeight)
    })
  }, [])

  return (
    <View
      className="fixed top-0 left-0 bg-white"
      style={{
        paddingTop: paddingTop + 'px',
        height: isAutoHeight ? 'auto' : '2.625rem',
        paddingBottom: '8rpx',
        zIndex: '99',
        width: '100%',
      }}
    >
      {isCustom ? (
        children
      ) : (
        <View className="flex items-center h-full pl-2">
          {isNeedBack ? (
            <View
              className="absolute flex items-center rounded-2xl"
              style={{ height: '30px', border: '1px solid #C3C3C3' }}
            >
              <View
                style={{ borderRight: '1px solid #C3C3C3' }}
                className="h-full flex items-center pl-3 pr-2"
                onClick={() => {
                  console.log('current pages router ', getCurrentPages())
                  if (backEvent) {
                    backEvent && backEvent()
                  } else {
                    Taro.navigateBack({ delta: 1 })
                  }
                }}
              >
                <IconFont name="fanhui-dingbu" size={40} />
              </View>
              <View
                onClick={() => {
                  Taro.switchTab({
                    url: '/pages/index/index',
                  })
                }}
                className="h-full flex items-center pl-3 pr-3"
              >
                <IconFont name="shouye" size={40} />
              </View>
            </View>
          ) : null}
          <View className="m-auto">{navbarTitle}</View>
        </View>
      )}
    </View>
  )
}
export default NavBar
