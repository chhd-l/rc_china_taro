import { Swiper, SwiperItem, Image } from '@tarojs/components'
import { SwiperProps } from '@/framework/types/products'

interface ActivityProps {
  list: SwiperProps[]
}
const ActivityList = ({ list }: ActivityProps) => {
  return (
    <Swiper indicatorColor="#fff" indicatorActiveColor="#e2001a" circular autoplay>
      {list.map((item, idx) => (
        <SwiperItem key={idx}>{item.img ? <Image src={item.img} mode="widthFix" style="width:100%" /> : null}</SwiperItem>
      ))}
    </Swiper>
  )
}

export default ActivityList
