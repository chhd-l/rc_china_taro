import { useState } from "react";
import { View, Radio } from "@tarojs/components";
import { AtDivider, AtIcon, AtModal } from "taro-ui";
import "./index.less";

const AddressItem = () => {
  const [showDelTip, setShowDelTip] = useState(false);

  const delAddress = () => {};

  return (
    <View className="p-2 bg-white address-item text-sm">
      <View className="flex flex-row justify-between">
        <text>Rechl</text>
        <text className="text-gray-400">13101227768</text>
      </View>
      <View className="mt-2">111111</View>
      <AtDivider className="p-0 my-2 rc_divider" />
      <View className="flex flex-row justify-between items-center">
        <Radio value="选中" checked={false}>
          默认地址
        </Radio>
        <View className="flex flex-row items-center">
          <AtIcon value="file-generic" size="24" color="#D1D5DB" />
          <View className="h-4 border-r border-t-0 border-b-0 border-l-0 border-solid border-gray-300 mx-1" />
          <AtIcon
            value="trash"
            size="24"
            color="#D1D5DB"
            onClick={() => {
              setShowDelTip(true);
            }}
          />
        </View>
      </View>
      <AtModal
        isOpened={showDelTip}
        title="确定删除地址信息？"
        cancelText="再想想"
        confirmText="狠心删除"
        onClose={() => {
          setShowDelTip(false);
        }}
        onCancel={() => {
          setShowDelTip(false);
        }}
        onConfirm={() => delAddress()}
      />
    </View>
  );
};
export default AddressItem;
