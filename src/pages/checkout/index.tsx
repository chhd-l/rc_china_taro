import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import {
  Address,
  TradeItem,
  DeliveryTime,
  Remark,
  Coupon,
  TotalCheck,
  TradePrice,
} from "@/components/checkout";
import { LineItem } from "@/framework/types/cart";
import Taro from "@tarojs/taro";
import { formatDate } from "@/utils/utils";
import "./index.less";

const Checkout = () => {
  const [address, setAddress] = useState({});
  const [tradeItems, setTradeItems] = useState<LineItem[]>([]);
  const [deliveryTime, setDeliveryTime] = useState(formatDate(new Date()));
  const [remark, setRemark] = useState("");
  const [totalNum, setTotalNum] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const changeDeliveryDate = (value) => {
    setDeliveryTime(value);
  };

  const changeRemark = (value) => {
    setRemark(value);
  };

  const getTotalNum = () => {
    const total = tradeItems.reduce((prev, cur) => {
      return prev + cur.quantity;
    }, 0);
    setTotalNum(total);
  };
  const getTotalPrice = () => {
    const total = tradeItems.reduce((prev, cur) => {
      return prev + cur.quantity * cur.price;
    }, 0);
    setTotalPrice(total);
  };

  const checkNow = () => {
    const params = {
      address,
      tradeItems,
      deliveryTime,
      remark,
    };
    console.log(params);
  };

  useEffect(() => {
    getTotalNum();
    getTotalPrice();
  }, [tradeItems]);

  useEffect(() => {
    Taro.getStorage({
      key: "select-product",
      success: function (res) {
        setTradeItems(JSON.parse(res.data));
      },
    });
    Taro.getStorage({
      key: "select-address",
      success: function (res) {
        if(res.data){
          setAddress(JSON.parse(res.data));
        }
      },
    });
  }, []);

  return (
    <View className="index py-2">
      <View className="px-4">
        <Address address={address}/>
        <View className="bg-gray-50 pb-2 mt-2">
          <TradeItem tradeItems={tradeItems} />
          <View className="px-2">
            <DeliveryTime changeDeliveryDate={changeDeliveryDate} />
            <Coupon />
            <Remark changeRemark={changeRemark} />
          </View>
        </View>
        <TradePrice totalPrice={totalPrice} discountPrice={0} shipPrice={0} />
      </View>
      <View className="fixed bottom-0 w-full">
        <TotalCheck
          num={totalNum}
          totalPrice={totalPrice}
          checkNow={checkNow}
        />
      </View>
    </View>
  );
};

export default Checkout;
