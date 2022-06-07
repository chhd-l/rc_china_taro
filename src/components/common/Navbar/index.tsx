import Taro, {getCurrentPages} from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import IconFont from '@/iconfont'

const NavBar = ({
  children,
  isCustom = false,
  isNeedBack = false,
  navbarTitle = '',
  backEvent,
}: {
  children?: any
  isCustom?: boolean
  isNeedBack?: boolean
  navbarTitle?: string
  backEvent?: Function
}) => {
  const [paddingTop, setPaddingTop] = useState<any>(0)

  useEffect(() => {
    //将状态栏高度挂载全局，方便自定义页面导航栏
    Taro.getSystemInfo({}).then((res) => {
      console.log(res.statusBarHeight)
      setPaddingTop(res.statusBarHeight)
    })
  }, [])

  return (
    <View className="sticky top-0 left-0 z-50 bg-white" style={{ paddingTop: paddingTop + 'px', height: '2.625rem' }}>
      {isCustom ? (
        children
      ) : (
        <View className="flex items-center h-full pl-2">
          {isNeedBack ? (
            <View
              className="absolute flex items-center rounded-2xl"
              style={{ height: '30px', border: '1px solid #666666' }}
            >
              <View
                style={{ borderRight: '1px solid #666666' }}
                className="h-full flex items-center pl-3"
                onClick={() => {
                  console.log('current pages router ', getCurrentPages())
                  if (backEvent) {
                    backEvent && backEvent()
                  } else {
                    Taro.navigateBack({ delta: 1 })
                  }
                }}
              >
                <IconFont name="fanhui-dingbu" size={48} />
              </View>
              <View
                onClick={() => {
                  Taro.switchTab({
                    url: '/pages/index/index',
                  })
                }}
                className="h-full flex items-center pl-1 pr-3"
              >
                <IconFont name="shouye" size={48} />
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
