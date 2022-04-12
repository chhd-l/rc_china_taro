import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { AddressItem } from "@/components/customer";
import { useEffect, useState } from "react";
import { Address } from "@/framework/types/customer";
import "./index.less";

const Index = () => {
  const [addressList, setAddressList] = useState<Address[]>([]);

  useEffect(() => {
    Taro.getStorage({
      key: "addressList",
      success: function (res) {
        const data = JSON.parse(res.data);
        console.log("addressList", data);
        setAddressList(data);
      },
    });
  }, []);

  const getWechatAddress = () => {
    Taro.chooseAddress({
      success: function (res) {
        console.log(res.userName); //receiver
        console.log(res.postalCode); //postcode
        console.log(res.provinceName); //province
        console.log(res.cityName); //city
        console.log(res.countyName); //region
        console.log(res.detailInfo); //detail
        console.log(res.nationalCode);
        console.log(res.telNumber); //phone
        //todo
        //将获取到或者新增的地址传给后台
      },
    });
  };

  return (
    <View className="index bg-gray-200 p-2 h-screen">
      {addressList.map((item: Address) => (
        <AddressItem addressInfo={item} />
      ))}
      <View className="m-0 flex flex-row justify-end mt-2">
        <Button
          className="text-xs m-0 h-6 bg-white mr-2 flex items-center text-gray-400"
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/newAddress/index",
            });
          }}
        >
          +新增地址
        </Button>
        <Button
          className="text-xs m-0 bg-white flex items-center text-gray-400"
          onClick={() => getWechatAddress()}
        >
          +获取微信收货地址
        </Button>
      </View>
    </View>
  );
};

export default Index;
