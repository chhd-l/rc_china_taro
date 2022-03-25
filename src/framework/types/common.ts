import { CentPrecisionMoney, Scalars } from "../schema/common.schema";

export type DiscountedPrice = {
  value: CentPrecisionMoney;
  discount: ProductDiscount;
};

export type ProductDiscount = {
  id: string;
  name: Scalars["LocalizedString"];
};

export type TaxRate = {
  id: string;
  name: string;
  // amount:float
  includedInPrice: boolean;
};

export type Asset = {
  id: string;
  sources: AssetSource[];
  name: Scalars["LocalizedString"];
  description: Scalars["LocalizedString"];
  tags: string[];
};

export type AssetSource = {
  uri: string;
  contentType?: string;
};

export type Images = {
  url: string;
  dimensions?: { w: Number; h: Number };
  label?: string;
};
