import { Button, MovableArea, MovableView } from '@tarojs/components'
import { useState } from 'react'
import { CUSTOMER_SERVICE } from '@/lib/constants'
import './index.less'

const CustomerService = () => {
  const [xOffset, setXOffset] = useState(320)
  const [yOffset, setYOffset] = useState(540)

  return (
    <MovableArea style="height: 100vh;" className="fixed w-full z-50 pointer-events-none">
      <MovableView
        className="pointer-events-auto z-50"
        style={{
          height: '112rpx',
          width: '112rpx',
        }}
        direction="all"
        x={xOffset}
        y={yOffset}
        outOfBounds
        onTouchEnd={(e) => {
          console.log('mmmmmmmmmmm', e)
          const x = e.changedTouches[0].pageX
          if (x > 0 && x < 160) {
            setXOffset(0)
          }
          if (x > 160 && x < 320) {
            setXOffset(320)
          }
        }}
      >
        <Button
          openType="contact"
          onContact={(e) => {
            console.log('vvvvvsd', e)
          }}
          sessionFrom="11111111"
          className="customer-service-button bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${CUSTOMER_SERVICE})`,
          }}
        />
      </MovableView>
    </MovableArea>
  )
}

export default CustomerService
