import { TaxRate, Asset, Images } from "./common";
import {
  Scalars,
  CreatedBy,
  LastModifiedBy,
  CentPrecisionMoney,
  HighPrecisionMoney,
} from "../schema/common.schema";
import { InventoryMode, TaxMode, CartOrigin } from "../enum";

export type Price = {
  id: string;
  value: CentPrecisionMoney | HighPrecisionMoney;
  country: string;
  validFrom: Scalars["DateTime"];
  validUntil: Scalars["DateTime"];
  // tiers :PriceTier[]
  // discounted :DiscountedPrice
};

export type LineItem = {
  id: string;
  productId: string; //spuId
  name: Scalars["LocalizedString"]; //product name
  //productType:ProductType
  variant:ProductVariant //sku info
  price: Price;
  taxedPrice: TaxedPrice;
  totalPrice: CentPrecisionMoney;
  quantity: number;
  taxRate: TaxRate;
  lineItemMode: "Standard" | "GiftLineItem";
  //product规格？
  //适用年龄？
  //建议干湿搭配？
  //建议饲喂天数？
  addedAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  state: ItemState[];
  // discountedPricePerQuantity:DiscountedLineItemPriceForQuantity[]
  // priceMode:LineItemPriceMode
  // lineItemMode:LineItemMode
};

export type ItemState = {
  quantity: number;
  state: State;
};

export type State = {
  id: string;
  name: Scalars["LocalizedString"];
  description: Scalars["LocalizedString"];
};

export type Store = {
  id: string;
  name: Scalars["LocalizedString"];
  languages: string[];
  //todo
  // productSelections - ProductSelectionSetting[]
  createdAt?: Scalars["DateTime"];
  lastModifiedAt?: Scalars["DateTime"];
};

export type Cart = {
  id: string;
  createdAt?: Scalars["DateTime"];
  createdBy?: CreatedBy;
  lastModifiedAt?: Scalars["DateTime"];
  lastModifiedBy?: LastModifiedBy;
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
  store: Store;
  lineItems: LineItem[]; //product items
  // The sum of all the prices of all the items in the cart.
  // Duties, taxes, shipping and discounts excluded.
  lineItemsSubtotalPrice: number;//new
  // Price of the cart before duties, shipping and taxes.
  subtotalPrice: number;//new 订阅总价
  // The sum of all the prices of all the items in the cart.
  // Duties, taxes and discounts included.
  totalPrice: CentPrecisionMoney;
  taxedPrice?: TaxedPrice;
  totalLineItemQuantity: number;
  // shippingInfo: ShippingInfo;
  // discountCodes: DiscountCodeInfo[];
  inventoryMode: InventoryMode;
  taxMode: TaxMode;
  deleteDaysAfterLastModification?: number;
  origin: CartOrigin;
  // discount?:Discount[]
};

export type ProductVariant = {
  id: number;
  sku: string;
  prices: Price[];
  // attributes: Attribute[];
  //规格？
  price: Price;
  images: Images[];
  assets: Asset[];
  availability: ProductVariantAvailability;//是否有库存以及库存情况
  isMatchingVariant: boolean;//是否是选中的那个sku
  scopedPrice: ScopedPrice;
  scopedPriceDiscounted: boolean;
  // Indicates if the product variant is available for sale.
  availableForSale?: boolean
};

export type ProductVariantAvailability = {
  isOnStock: boolean;
  restockableInDays: number;
  availableQuantity: number;
};

export type ScopedPrice = {
  id: string;
  value: CentPrecisionMoney | HighPrecisionMoney;
  currentValue: CentPrecisionMoney | HighPrecisionMoney;
  country: string;
  validFrom: Scalars["DateTime"];
  validUntil: Scalars["DateTime"];
  // discounted :DiscountedPrice
};

export type TaxedPrice = {
  totalNet: CentPrecisionMoney;
  totalGross: CentPrecisionMoney;
  taxPortions?: TaxPortion[];
};

export type TaxPortion = {
  name: string;
  rate: number;
  amount: CentPrecisionMoney;
};

export interface CartPrice {
  totalPrice: number
  tradePrice: number
  subscriptionDiscountPrice: number
  shippingPrice: number
  promotions: PromotionItem[]
  promotionFlag: boolean
}

export interface PromotionItem {
  label: string
  discount: number
  code: string
}
