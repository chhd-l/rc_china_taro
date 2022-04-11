import { SwiperItem, Image, Swiper } from "@tarojs/components";
import { SwiperProps } from "@/framework/types/products";

interface ListBannerProps {
  bannerList: SwiperProps[];
}
const ListBanner = ({ bannerList }: ListBannerProps) => {
  return (
    <Swiper
      indicatorColor="#999"
      indicatorActiveColor="#333"
      circular
      indicatorDots
      autoplay
    >
      {bannerList.map((banner) => (
        <SwiperItem>
          {banner.img ? (
            <Image
              src={banner.img}
              lazyLoad
              mode="widthFix"
              style="width:100%"
            />
          ) : null}
        </SwiperItem>
      ))}
    </Swiper>
  );
};
export default ListBanner;
