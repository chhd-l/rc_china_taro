import { Picker, Text, View } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { useState } from "react";
import { formatDate } from "@/utils/utils";

const DeliveryTime = ({
  changeDeliveryDate,
}: {
  changeDeliveryDate: Function;
}) => {
  const [deliveryTime, setDeliveryTime] = useState(formatDate(new Date()));

  const onDateChange = (e) => {
    setDeliveryTime(e.detail.value);
    changeDeliveryDate && changeDeliveryDate(e.detail.value);
  };

  return (
    <View className="bg-white mt-2">
      <Picker mode="date" value={deliveryTime} onChange={onDateChange}>
        <View className="flex flex-row justify-between p-2 items-center">
          <View className="text-30">发货时间</View>
          <View>
            <View>
              <Text className="text-xs text-gray-400">{deliveryTime}</Text>
              <AtIcon value="chevron-right" size="24" />
            </View>
          </View>
        </View>
      </Picker>
    </View>
  );
};
export default DeliveryTime;
