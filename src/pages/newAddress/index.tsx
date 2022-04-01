import { Radio, View } from "@tarojs/components";
import { useState } from "react";
import { AtForm, AtInput, AtButton, AtTextarea } from "taro-ui";
import { Address } from "@/framework/types/customer";
import "./index.less";

const Index = () => {
  const [addressInfo, setAddressInfo] = useState<Address>({
    receiver: "",
    phone: "",
    province: "",
    city: "",
    region: "",
    detail: "",
    isDefault: 0,
  });

  const updateAddressInfo = (value: any, name: string) => {
    setAddressInfo({ ...addressInfo, [name]: value });
  };

  const saveNewAddress = () => {};

  return (
    <View className="index bg-gray-200 p-2 h-screen">
      <AtForm className="p-2" onSubmit={() => saveNewAddress()}>
        <View className=" bg-white">
          <AtInput
            name="receiver"
            title="收货人"
            type="text"
            placeholder="请输入姓名"
            value={addressInfo["name"]}
            onChange={(value) => updateAddressInfo(value, "receiver")}
          />
          <AtInput
            name="phone"
            title="联系电话"
            type="text"
            placeholder="请输入联系电话"
            value={addressInfo["phone"]}
            onChange={(value) => updateAddressInfo(value, "phone")}
          />
          <AtTextarea
            value={addressInfo["detail"]}
            onChange={(value) => updateAddressInfo(value, "detail")}
            maxLength={200}
            placeholder="请输入详细地址"
          />
          <Radio
            value="0"
            checked={Boolean(addressInfo.isDefault)}
            onClick={() =>
              updateAddressInfo(!addressInfo.isDefault, "isDefault")
            }
          >
            默认地址
          </Radio>
        </View>
      </AtForm>
      <View className="mt-2">
        <AtButton className="bg-red-500 color-white w-20" formType="submit">
          保存
        </AtButton>
      </View>
    </View>
  );
};

export default Index;
