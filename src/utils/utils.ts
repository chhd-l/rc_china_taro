export const getCurrencyCode = () => {
  return "￥";
};

export const formatMoney = (price: number) => {
  return getCurrencyCode() + price.toFixed(2);
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month =
    date.getMonth() <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth();
  const day = date.getDate();
  return year + "-" + month + "-" + day;
};
