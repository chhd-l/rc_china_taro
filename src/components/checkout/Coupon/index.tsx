import { View, Text } from "@tarojs/components";
import { AtIcon, AtModal } from "taro-ui";
import { useState } from "react";

const Coupon = () => {
  const [showNoCoupon, setShowNoCoupon] = useState(false);

  const selectCoupon = () => {
    setShowNoCoupon(true);
  };

  return (
    <View className="bg-white mt-2">
      <View className="flex flex-row justify-between items-center">
        <View className="text-30">优惠券</View>
        <View>
          <View>
            <Text className="text-xs text-gray-400">无</Text>
            <AtIcon value="chevron-right" size="24" onClick={selectCoupon} />
          </View>
        </View>
      </View>
      <AtModal
        isOpened={showNoCoupon}
        title="提示"
        confirmText="确定"
        content="无可用优惠券"
        onClose={() => {
          setShowNoCoupon(false);
        }}
        onConfirm={() => setShowNoCoupon(false)}
      />
    </View>
  );
};
export default Coupon;
