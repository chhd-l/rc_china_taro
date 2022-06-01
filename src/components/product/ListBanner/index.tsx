import Taro from '@tarojs/taro'
import { SwiperItem, Image, Swiper } from '@tarojs/components'
import { SwiperProps } from '@/framework/types/products'
import './index.less'

interface ListBannerProps {
  bannerList: SwiperProps[]
}
const ListBanner = ({ bannerList }: ListBannerProps) => {
  return (
    <Swiper
      style={`width:100%; height:${Taro.getSystemInfoSync().screenWidth}px !important;`}
      indicatorColor="#fff"
      indicatorActiveColor="#d33024"
      circular
      indicatorDots
      autoplay
    >
      {bannerList.map((banner, idx) => (
        <SwiperItem key={idx} style={`width:100%; height:${Taro.getSystemInfoSync().screenWidth}px;`}>
          {banner.img ? (
            <Image
              src={banner.img}
              lazyLoad
              mode="widthFix"
              style={`width:100%;height:${Taro.getSystemInfoSync().screenWidth}px;`}
            />
          ) : null}
        </SwiperItem>
      ))}
    </Swiper>
  )
}
export default ListBanner
