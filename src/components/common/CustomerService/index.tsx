import { Button, MovableArea, MovableView } from '@tarojs/components'
import { useState } from 'react'
import { CUSTOMER_SERVICE } from '@/lib/constants'
import Taro from '@tarojs/taro'
import './index.less'

const CustomerService = () => {
  const screenWidth = Taro.getSystemInfoSync().screenWidth
  const screenHeight = Taro.getSystemInfoSync().screenHeight
  const [xOffset, setXOffset] = useState(screenWidth)
  const [yOffset, setYOffset] = useState(screenHeight - 300)

  return (
    <MovableArea
      className="fixed w-full z-50 pointer-events-none"
      style={{ width: screenWidth + 'px', height: screenHeight - 180 + 'px', marginTop: '2.625rem' }}
    >
      <MovableView
        className="pointer-events-auto z-50 customer-service-size"
        direction="all"
        x={xOffset}
        y={yOffset}
        outOfBounds
        onTouchEnd={(e) => {
          console.log('mmmmmmmmmmm', e)
          const x = e.changedTouches[0].pageX
          const y = e.changedTouches[0].pageY
          if (x < screenWidth / 2) {
            setXOffset(0)
          } else {
            setXOffset(screenWidth)
          }
          setYOffset(y - 100)
        }}
      >
        <Button
          openType="contact"
          className="customer-service-button customer-service-size bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${CUSTOMER_SERVICE})`,
          }}
        />
      </MovableView>
    </MovableArea>
  )
}

export default CustomerService
