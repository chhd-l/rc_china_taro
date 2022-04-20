import { View } from "@tarojs/components";
import { AtInput } from "taro-ui";
import { useState } from "react";

const Remark = ({ changeRemark }: { changeRemark: Function }) => {
  const [remark, setRemark] = useState("");

  const onChange = (value) => {
    setRemark(value);
    changeRemark && changeRemark(value);
  };

  return (
    <View className="bg-white mt-2">
      <View className="flex flex-row justify-between items-center">
        <View className="text-30 p-2">备注信息</View>
        <View>
          <AtInput
            placeholder="请填写需要备注信息"
            name="remark"
            value={remark}
            onChange={onChange}
            border={false}
          />
        </View>
      </View>
    </View>
  );
};
export default Remark;
