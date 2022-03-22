//money
export type CentOrHighPrecisionMoney = {
  type?: "centPrecision" | "highPrecision";
  currencyCode: string;
  centAmount: number;
  preciseAmount?: number;
  fractionDigits?: number;
};

export type TaxedPrice = {
  totalNet: CentOrHighPrecisionMoney;
  totalGross: CentOrHighPrecisionMoney;
  taxPortions?: TaxPortion[];
};

export type TaxPortion = {
  name: string;
  rate: number;
  amount: CentOrHighPrecisionMoney;
};

export type LineItem = {
  id: string;
  productId: string;
  name: LocalizedString; //product name
  price: Price;
  taxedPrice: TaxedPrice;
  totalPrice: CentOrHighPrecisionMoney;
  quantity: number;
  taxRate: TaxRate;
  lineItemMode: "Standard" | "GiftLineItem";
  //product图片？
  //product规格？
  //适用年龄？
  //建议干湿搭配？
  //建议饲喂天数？
};

export type LocalizedString = {
  de?: string;
  zh?: string;
};

export type Price = {
  id: string;
  value: CentOrHighPrecisionMoney;
  discounted: DiscountedPrice;
};

export type DiscountedPrice = {
  value: CentOrHighPrecisionMoney;
  discount: ProductDiscount;
};

export type ProductDiscount = {
  id: string;
  name: LocalizedString;
};

export type TaxRate = {
  id: string;
  name: string;
  // amount:float
  includedInPrice: boolean;
};
