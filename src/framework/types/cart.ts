import { TaxedPrice, TaxRate, Asset, Images } from "./common";
import {
  Scalars,
  CreatedOrLastModifiedBy,
  CentOrHighPrecisionMoney,
} from "./schema";
import { InventoryMode, TaxMode, CartOrigin } from "./enum";

export type Price = {
  id: string;
  value: CentOrHighPrecisionMoney;
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
  //variant:ProductVariant //sku info
  price: Price;
  taxedPrice: TaxedPrice;
  totalPrice: CentOrHighPrecisionMoney;
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

export type Carts = {
  id: string;
  createdAt?: Scalars["DateTime"];
  createdBy?: CreatedOrLastModifiedBy;
  lastModifiedAt?: Scalars["DateTime"];
  lastModifiedBy?: CreatedOrLastModifiedBy;
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
  store: Store;
  lineItems: LineItem[]; //product items
  totalPrice: CentOrHighPrecisionMoney;
  taxedPrice?: TaxedPrice;
  totalLineItemQuantity: number;
  // shippingInfo: ShippingInfo;
  // discountCodes: DiscountCodeInfo[];
  inventoryMode: InventoryMode;
  taxMode: TaxMode;
  deleteDaysAfterLastModification?: number;
  origin: CartOrigin;
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
  availability: ProductVariantAvailability;
  isMatchingVariant: boolean;
  scopedPrice: ScopedPrice;
  scopedPriceDiscounted: boolean;
};

export type ProductVariantAvailability = {
  isOnStock: boolean;
  restockableInDays: number;
  availableQuantity: number;
};

export type ScopedPrice = {
  id: string;
  value: CentOrHighPrecisionMoney;
  currentValue: CentOrHighPrecisionMoney;
  country: string;
  validFrom: Scalars["DateTime"];
  validUntil: Scalars["DateTime"];
  // discounted :DiscountedPrice
};
