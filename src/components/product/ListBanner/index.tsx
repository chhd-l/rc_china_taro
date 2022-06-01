import Taro from '@tarojs/taro'
import { SwiperItem, Image, Swiper, View } from '@tarojs/components'
// import { SwiperProps } from '@/framework/types/products'
import './index.less'

interface ListBannerProps {
  bannerList: any[]
}
const ListBanner = ({ bannerList }: ListBannerProps) => {
  const toPage = ({ linkHref }) => {
    console.info('linkHref', linkHref)
    Taro.navigateTo({
      url: linkHref,
    })
  }
  return (
    <Swiper
      style={`width:100%; height:${Taro.getSystemInfoSync().screenWidth}px !important;`}
      indicatorColor="#fff"
      indicatorActiveColor="#d33024"
      circular
      indicatorDots
      autoplay
    >
      {bannerList.map((banner) => (
        <SwiperItem style={`width:100%; height:${Taro.getSystemInfoSync().screenWidth}px;`}>
          {banner.img ? (
            <View className="relative bg-red-600" onClick={() => {
              console.info('bannerbanner', banner)
              toPage(banner)
            }}>
              {banner.status ? <View className="absolute top-1 left-1">{banner.status}</View> : null}
              <Image
                src={banner.img}
                lazyLoad
                mode="widthFix"
                style={`width:100%;height:${Taro.getSystemInfoSync().screenWidth}px;`}
              />
            </View>
          ) : null}
        </SwiperItem>
      ))}
    </Swiper>
  )
}
export default ListBanner
