import { MovableArea, MovableView, Text } from '@tarojs/components'
import { AtFab } from 'taro-ui'
import { useState } from 'react'

const CustomerService = () => {
  const [xOffset, setXOffset] = useState(0)

  return (
    <MovableArea style="height: 100vh; width: 100%;background:red">
      <MovableView
        style="height: 112rpx; width: 112rpx;background:blue"
        direction="all"
        x={xOffset}
        onDragEnd={(e) => {
          console.log('vvvvvvvvvvvvvv', e)
        }}
        onChange={(e) => {
          setXOffset(0)
          console.log('vcdcdcddcdd', e)
          if (e?.detail?.x > 0) {
            console.log(e?.detail?.x)
            setXOffset(50)
          }
        }}
      >
        <AtFab>
          <Text className="at-fab__icon at-icon at-icon-menu" />
        </AtFab>
      </MovableView>
    </MovableArea>
  )
}

export default CustomerService
