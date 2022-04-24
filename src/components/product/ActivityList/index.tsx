import { Swiper, SwiperItem, Image } from '@tarojs/components'
import { SwiperProps } from '@/framework/types/products'

interface ActivityProps {
  list: SwiperProps[]
}
const ActivityList = ({ list }: ActivityProps) => {
  return (
    <Swiper indicatorColor="#fff" indicatorActiveColor="#e2001a" circular indicatorDots autoplay>
      {list.map((item) => (
        <SwiperItem>{item.img ? <Image src={item.img} mode="widthFix" style="width:100%" /> : null}</SwiperItem>
      ))}
    </Swiper>
  )
}

export default ActivityList
