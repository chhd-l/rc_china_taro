import { View, Image, ScrollView, BaseEventOrig, ScrollViewProps } from '@tarojs/components'
import NavBar from '@/components/common/Navbar'
import {
  MYACCOUNT_SOCIALGROUP_BANNER,
  MYACCOUNT_SOCIALGROUP_01,
  MYACCOUNT_SOCIALGROUP_02,
  MYACCOUNT_SOCIALGROUP_03,
} from '@/lib/mine'
import { useState } from 'react'
import { AtModal, AtModalContent } from 'taro-ui'
import './index.less'

const scrollTop = 0
const Threshold = 20

const Welfare = () => {
  const [scrollHeight, setScrollHeight] = useState(0)
  const [open, setOpen] = useState(false)
  const onScroll = (e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => setScrollHeight(e.detail.scrollTop)

  return (
    <View>
      <NavBar navbarTitle="社群开始招募啦" isNeedBack />
      <View className={`${scrollHeight > 499 ? 'block' : 'hidden'} z-10 relative `} id="topImage">
        <Image src={MYACCOUNT_SOCIALGROUP_01} onClick={() => setOpen(true)} className="h-rc144 w-full" />
      </View>
      <ScrollView
        className="scrollview"
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        style={{ height: scrollHeight > 499 ? '76vh' : '100vh' }}
        lowerThreshold={Threshold}
        onScroll={onScroll}
      >
        <Image src={MYACCOUNT_SOCIALGROUP_BANNER} className="h-rc724 w-full" />
        <Image src={MYACCOUNT_SOCIALGROUP_01} className="h-rc144 w-full" onClick={() => setOpen(true)} />
        <Image src={MYACCOUNT_SOCIALGROUP_02} className="h-rc5800 w-full" />
      </ScrollView>
      <AtModal isOpened={open} closeOnClickOverlay onClose={() => setOpen(false)} className="modal">
        <AtModalContent>
          <Image src={MYACCOUNT_SOCIALGROUP_03} className="h-rc823 w-full" show-menu-by-longpress />
        </AtModalContent>
      </AtModal>
    </View>
  )
}

export default Welfare
