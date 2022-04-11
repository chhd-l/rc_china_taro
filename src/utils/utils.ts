export const getCurrencyCode = () => {
  return "￥";
};

export const formatMoney = (price:number) => {
  return getCurrencyCode() + price.toFixed(2);
};
