import { View, Image, ScrollView } from '@tarojs/components'
import {
  MYACCOUNT_SOCIALGROUP_BANNER,
  MYACCOUNT_SOCIALGROUP_01,
  MYACCOUNT_SOCIALGROUP_02,
  MYACCOUNT_SOCIALGROUP_03,
  MYACCOUNT_SOCIALGROUP_SHADOW_01,
} from '@/lib/mine'
import { useState } from 'react'
import { AtModal, AtModalContent } from 'taro-ui'
import './index.less'

const Welfare = () => {
  const [scrollHeight, setScrollHeight] = useState(0)
  const [open, setOpen] = useState(false)
  const scrollTop = 0
  const Threshold = 20
  const scrollStyle = {
    height: '100vh',
  }

  const onScroll = (e) => setScrollHeight(e.detail.scrollTop)

  return (
    <View>
      <Image
        onClick={() => setOpen(true)}
        src={MYACCOUNT_SOCIALGROUP_SHADOW_01}
        className={`h-rc176 w-full ${scrollHeight > 499 ? 'block' : 'hidden'}`}
      />
      <ScrollView
        className="scrollview"
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        style={scrollStyle}
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScroll={onScroll}
      >
        <Image src={MYACCOUNT_SOCIALGROUP_BANNER} className="h-rc724 w-full" />
        <Image src={MYACCOUNT_SOCIALGROUP_01} className="h-rc144 w-full" onClick={() => setOpen(true)} />
        <Image src={MYACCOUNT_SOCIALGROUP_02} className="h-rc5000 w-full" />
      </ScrollView>
      <AtModal isOpened={open} closeOnClickOverlay onClose={() => setOpen(false)} className="modal">
        <AtModalContent>
          <Image src={MYACCOUNT_SOCIALGROUP_03} className="h-rc823 w-full" />
        </AtModalContent>
      </AtModal>
    </View>
  )
}

export default Welfare
