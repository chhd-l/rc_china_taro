import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
// import { SwiperProps } from '@/framework/types/products'
import './index.less'

interface ListBannerProps {
  bannerList: any[]
  liveStreaming?: any
}
const ListBanner = ({ bannerList, liveStreaming }: ListBannerProps) => {
  let list = liveStreaming ? [liveStreaming, ...bannerList] : bannerList
  return (
    <Swiper
      style={`width:100%; height:${Taro.getSystemInfoSync().screenWidth}px !important;`}
      indicatorColor="#fff"
      indicatorActiveColor="#d33024"
      circular
      indicatorDots
      autoplay
    >
      {list.map((banner, idx) => (
        <SwiperItem key={idx} style={`width:100%; height:${Taro.getSystemInfoSync().screenWidth}px;`}>
          {banner.img ? (
            <View
              className="relative"
              onClick={() => {
                console.info('bannerbanner', banner)
                Taro.navigateTo({
                  url: banner?.linkHref || '',
                })
              }}
            >
              {/* 直播间状态。101：直播中，102：未开始，103已结束，104禁播，105：暂停，106：异常，107：已过期 */}
              {banner.statusIcon ? (
                <View className="absolute top-1 left-1">
                  <View
                    className="w-16 h-8 bg-no-repeat bg-contain"
                    style={{ backgroundImage: `url(${banner.statusIcon})` }}
                  ></View>
                </View>
              ) : null}
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
