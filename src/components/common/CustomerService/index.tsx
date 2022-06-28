import { Button, MovableArea, MovableView } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { CUSTOMER_SERVICE } from '@/lib/constants'
import Taro from '@tarojs/taro'
import './index.less'

const CustomerService = () => {
  const screenWidth = Taro.getSystemInfoSync().windowWidth
  const screenHeight = Taro.getSystemInfoSync().windowHeight
  const tabBarHeight = Taro.getSystemInfoSync()?.statusBarHeight || 47
  const navBarHeight = Taro.getSystemInfoSync()?.safeArea?.top || 42
  const [xOffset, setXOffset] = useState(screenWidth)
  const [yOffset, setYOffset] = useState(screenHeight - 200)

  useEffect(() => {
    console.log('111111', Taro.getSystemInfoSync())
  }, [])

  return (
    <MovableArea
      className="fixed w-full z-999 pointer-events-none"
      style={{
        width: screenWidth + 'px',
        height: screenHeight - tabBarHeight - navBarHeight + 'px',
        marginTop: navBarHeight + 'px',
      }}
    >
      <MovableView
        className="pointer-events-auto z-999 customer-service-size bg-white"
        direction="all"
        x={xOffset}
        y={yOffset}
        damping={15}
        outOfBounds
        animation
        onTouchEnd={(e) => {
          console.log('mmmmmmmmmmm', e)
          const x = e.changedTouches[0].pageX
          const y = e.changedTouches[0].pageY
          setXOffset(x < screenWidth / 2 ? 0 : screenWidth)
          setYOffset(y - 98)
        }}
      >
        <Button
          openType="contact"
          className="customer-service-button customer-service-size bg-cover bg-no-repeat z-999"
          style={{
            backgroundImage: `url(${CUSTOMER_SERVICE})`,
          }}
        />
      </MovableView>
    </MovableArea>
  )
}

export default CustomerService
