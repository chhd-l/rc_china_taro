import { Radio, View, Text } from "@tarojs/components";
import { useEffect, useState } from "react";
import { formatMoney } from "@/utils/utils";
import { AtButton, AtModal } from "taro-ui";
// import { LineItem } from "@/framework/types/cart";
import Taro from "@tarojs/taro";
import "./index.less";

const TotalSettle = ({
  isAllSelect,
  changeAllSelect,
  selectedProduct,
}: {
  isAllSelect: boolean;
  changeAllSelect: Function;
  selectedProduct: any[];
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showNoSelect, setShowNoSelect] = useState(false);

  const changeIsAllSelect = () => {
    setIsChecked(!isChecked);
    changeAllSelect && changeAllSelect(!isChecked);
  };

  const getTotalPrice = () => {
    const total = selectedProduct.reduce((prev, cur) => {
      return prev + cur.localData.price * cur.goodsNum;
    }, 0);
    setTotalPrice(total);
  };

  const checkoutProduct = () => {
    // if (selectedProduct.length === 0) {
    //   setShowNoSelect(true);
    //   return;
    // }
    Taro.setStorage({
      key: "select-product",
      data: JSON.stringify(selectedProduct),
      complete: (respon) => {
        console.log(respon);
        Taro.navigateTo({ url: "/pages/packageA/checkout/index" });
      },
    });
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
        <Text className="text-xs text-gray-400">合计</Text>
        <Text className="text-red text-2xl mx-1 font-semibold">
          {formatMoney(totalPrice)}
        </Text>
        <AtButton
          type="primary"
          className="total-settle-button w-24"
          onClick={() => checkoutProduct()}
        >
          去结算 ({selectedProduct.length})
        </AtButton>
      </View>
      <AtModal
        isOpened={showNoSelect}
        title="提示"
        confirmText="确定"
        content="请选择需要结算的商品"
        onClose={() => {
          setShowNoSelect(false);
        }}
        onConfirm={() => setShowNoSelect(false)}
      />
    </View>
  );
};
export default TotalSettle;
