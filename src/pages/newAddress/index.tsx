import { View } from "@tarojs/components";
import { useState } from "react";
import { AtForm, AtInput, AtButton } from "taro-ui";
import "./index.less";

const Index = () => {
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    phone: "",
    province: "",
    city: "",
    district: "",
  });

  const updateAddressInfo = (value: any, name: string) => {
    setAddressInfo({ ...addressInfo, [name]: value });
  };

  const saveNewAddress = () => {};

  return (
    <View className="index bg-gray-200 p-2 h-screen">
      <View className="bg-white p-2">
        <AtForm onSubmit={() => saveNewAddress()}>
          <AtInput
            name="name"
            title="收货人"
            type="text"
            placeholder="请输入姓名"
            value={addressInfo["name"]}
            onChange={(value) => updateAddressInfo(value, "name")}
          />
          <AtButton formType="submit">保存</AtButton>
        </AtForm>
      </View>
    </View>
  );
};

export default Index;
