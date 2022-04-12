import { Swiper, SwiperItem, Image } from "@tarojs/components";
import { SwiperProps } from "@/framework/types/products";

interface ActivityProps {
  list: SwiperProps[];
}
const ActivityList = ({ list }: ActivityProps) => {
  return (
    <Swiper
      indicatorColor="#999"
      indicatorActiveColor="#333"
      circular
      indicatorDots
      autoplay
    >
      {list.map((item) => (
        <SwiperItem>
          {item.img ? (
            <Image src={item.img} lazyLoad mode="widthFix" style="width:100%" />
          ) : null}
        </SwiperItem>
      ))}
    </Swiper>
  );
};

export default ActivityList;
