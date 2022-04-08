import {CartOrigin} from "@/framework/enum";
import { Scalars, CreatedBy, LastModifiedBy } from "../schema/common.schema";

export type Cart = {
  id: string;
  createdAt?: Scalars["DateTime"];
  createdBy?: CreatedBy;
  lastModifiedAt?: Scalars["DateTime"];
  lastModifiedBy?: LastModifiedBy;
  customerId?: string;
  customerEmail?: string;
  storeId?: string;
  lineItems: LineItem[]; //product items
  lineItemsSubtotalPrice: number; //The sum of all the prices of all the items in the cart.Duties, taxes, shipping and discounts excluded.
  subtotalPrice: number; //new 订阅总价 Price of the cart before duties, shipping and taxes.
  totalPrice: number; //The sum of all the prices of all the items in the cart.Duties, taxes and discounts included.
  taxedPrice: number;
  totalLineItemQuantity: number;
  promotion: PromotionItem[];
  origin?: CartOrigin; //来源，购物车下单/代客下单
  // shippingInfo: ShippingInfo;
  // discountCodes: DiscountCodeInfo[];
  // discount?:Discount[]
};

export type LineItem = {
  id?: string;
  productId: string; //spuId
  name: string; //product name
  variant: ProductVariant[]; //sku info
  price: number;
  subPrice?:number;//订阅价格
  taxedPrice?: number;
  totalPrice: number;
  quantity: number;
  lineItemMode: "Standard" | "GiftLineItem";
  addedAt?: Scalars["DateTime"];
  lastModifiedAt?: Scalars["DateTime"];
  select?:boolean
  // discountedPricePerQuantity:DiscountedLineItemPriceForQuantity[]
  // priceMode:LineItemPriceMode
  // lineItemMode:LineItemMode
  //productType:ProductType
  //product规格？
  //适用年龄？
  //建议干湿搭配？
  //建议饲喂天数？
};

export type ProductVariant = {
  id?: number;
  skuId: string;
  isOnStock: boolean;
  availableQuantity?: number; //还有多少库存
  price: number;
  image: string;
  isMatchingVariant: boolean; //是否是选中的那个sku
  availableForSale?: boolean; // Indicates if the product variant is available for sale.
  // attributes: Attribute[];
  //规格？
};

export interface PromotionItem {
  label: string;
  discount: number;
  code: string;
}
