import { Radio, View, Text } from "@tarojs/components";
import { useEffect, useState } from "react";
import { formatMoney } from "@/utils/utils";
import { AtButton } from "taro-ui";
import { LineItem } from "@/framework/types/cart";
import "./index.less";

const TotalSettle = ({
  isAllSelect,
  changeAllSelect,
  selectedProduct,
}: {
  isAllSelect: boolean;
  changeAllSelect: Function;
  selectedProduct: LineItem[];
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const changeIsAllSelect = () => {
    setIsChecked(!isChecked);
    changeAllSelect && changeAllSelect(!isChecked);
  };

  const getTotalPrice = () => {
    const total = selectedProduct.reduce((prev, cur) => {
      return prev + cur.totalPrice * cur.quantity;
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    getTotalPrice();
  }, [selectedProduct]);

  useEffect(() => {
    setIsChecked(isAllSelect);
  }, [isAllSelect]);

  return (
    <View className="bg-white flex flex-row justify-between items-center py-2 w-full">
      <View>
        <Radio
          value="选中"
          checked={isChecked}
          style={{ transform: "scale(0.6)" }}
          color="red"
          className="text-48"
          onClick={() => changeIsAllSelect()}
        >
          全选
        </Radio>
      </View>
      <View className="flex flex-row items-center pr-2">
        <Text className="text-xs">合计</Text>
        <Text className="text-red-500 text-xl mx-1">
          {formatMoney(totalPrice)}
        </Text>
        <AtButton
          type="primary"
          className="total-settle-button w-20 h-24"
          onClick={() => {}}
        >
          结算({selectedProduct.length})
        </AtButton>
      </View>
    </View>
  );
};
export default TotalSettle;
