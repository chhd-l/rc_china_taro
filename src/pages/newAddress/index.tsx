import { Radio, View, Text } from "@tarojs/components";
import { useState } from "react";
import { AtForm, AtInput, AtButton, AtTextarea } from "taro-ui";
import { Address } from "@/framework/types/customer";
import RegionPicker from "@/components/common/WePicker/index";
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
  const [address, setAddress] = useState(["浙江省", "杭州市", "滨江区"]);

  let WPickerRef: any = null;
  const onRef = (ref) => {
    WPickerRef = ref;
  };

  const onConfirm = (res: any) => {
    console.log(res);
    setAddressInfo({
      ...addressInfo,
      province: res.obj.province.label,
      city: res.obj.city.label,
      region: res.obj.area.label,
    });
    setAddress([
      res.obj.province.label,
      res.obj.city.label,
      res.obj.area.label,
    ]);
  };
  const onCancel = () => {};

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
          <View className="pl-3 py-2 text-32">
            <Text>所在地区</Text>
            <Text
              onClick={() => {
                WPickerRef.show();
              }}
              className="ml-7 text-gray-300"
            >
              {addressInfo.province
                ? addressInfo.province +
                  "," +
                  addressInfo.city +
                  "," +
                  addressInfo.region
                : "省,市,区"}
            </Text>
          </View>
          <RegionPicker
            mode="region"
            value={address}
            defaultType="label"
            hideArea={false}
            confirm={(res) => onConfirm(res)}
            cancel={onCancel}
            onRef={onRef}
          />
          <AtTextarea
            value={addressInfo["detail"]}
            onChange={(value) => updateAddressInfo(value, "detail")}
            maxLength={200}
            placeholder="请输入详细地址"
            count={false}
            className="ml-1 border-0 border-t-0 rc-text-area"
          />
          <Radio
            value="0"
            checked={Boolean(addressInfo.isDefault)}
            onClick={() =>
              updateAddressInfo(!addressInfo.isDefault, "isDefault")
            }
            style={{transform:'scale(0.6)'}}
            color='red'
            className="mt-2 text-48 -ml-4"
          >
            默认地址
          </Radio>
        </View>
      </AtForm>
      <View className="mt-2">
        <AtButton className="bg-red-500 rc-button text-white w-20" formType="submit">
          保存
        </AtButton>
      </View>
    </View>
  );
};

export default Index;
