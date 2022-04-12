import { View } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { Address } from "@/framework/types/customer";
import Taro from "@tarojs/taro";

const AddressInfo = ({ address }: { address: Address | any }) => {
  const { receiver, phone, province, city, region, detail } = address;

  return (
    <View className="bg-gray-50 p-2">
      {receiver ? (
        <View className="flex flex-row justify-between py-2 items-center">
          <View className="text-sm items-start font-medium">{receiver}</View>
          <View className="text-sm">
            <View> {phone}</View>
            <View>
              {province} {city} {region} {detail}
            </View>
          </View>
          <View>
            <AtIcon
              value="chevron-right"
              size="24"
              onClick={() => {
                Taro.navigateTo({ url: "/pages/addressManage/index" });
              }}
            />
          </View>
        </View>
      ) : (
        <View className="flex flex-row justify-between py-2 items-center">
          <View className="text-sm">新增收货地址</View>
          <View>
            <AtIcon
              value="chevron-right"
              size="24"
              onClick={() => {
                Taro.navigateTo({ url: "/pages/addressManage/index" });
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};
export default AddressInfo;
