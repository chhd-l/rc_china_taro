import { CentPrecisionMoney, Scalars } from "../schema/common.schema";

export interface OptionsProps {
  label: string;
  value: string;
}
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

export type TypeKeyReference = {
  typeId: "type";
  /**
   *
   */
  key: string;
};
/**
 *	References a product by key.
 */
export type ProductKeyReference = {
  typeId: "product";
  key: string;
};
export type TaxCategoryKeyReference = {
  typeId: "tax-category";
  /**
   *
   */
  key: string;
};
/**
 *	References a customer group by key.
 */
export type CustomerGroupKeyReference = {
  typeId: "customer-group";
  key: string;
};
/**
 *	References a channel by key.
 */
export type ChannelKeyReference = {
  typeId: "channel";
  /**
   *
   */
  key: string;
};
export type FieldContainer = {
  //todo
};
/**
 *	References a product type by key.
 */
export type ProductTypeKeyReference = {
  typeId: "product-type";
  /**
   *
   */
  key: string;
};
export type Image = {
  /**
   *	URL of the image in its original size. The URL must be unique within a single variant. It can be used to obtain the image in different sizes.
   *
   */
  url: string;
  /**
   *	Dimensions of the original image. This can be used by your application, for example, to determine whether the image is large enough to display a zoom view.
   *
   */
  dimensions: AssetDimensions;
  /**
   *	Custom label that can be used, for example, as an image description.
   *
   */
  label?: string;
};
export type AssetDimensions = {
  /**
   *	The width of the asset source.
   *
   */
  w: number;
  /**
   *	The height of the asset source.
   *
   */
  h: number;
};
export type CustomFields = {
  type: TypeKeyReference;
  fields?: FieldContainer;
};
