import {
  CustomFields,
  Scalars,
  CreatedBy,
  LastModifiedBy,
  CentPrecisionMoney,
  HighPrecisionMoney,
  CustomLineItem,
} from "./common.schema";
import { Address } from "./customer.schema";
import { InventoryMode, CartOrigin } from "../enum";

export type Store = {
  id: string;
  version: number;
  key: string;
  /**User-specific unique identifier for the store. The key is mandatory and immutable. It is used to reference the store.*/
  name: Scalars["LocalizedString"];
  /**The name of the store*/
  languages: string[];
  /**IETF language tag.*/
  //todo
  // distributionChannels - Set of Reference to a Channel with ProductDistribution ChannelRole
  // supplyChannels - Set of Reference to a Channel with InventorySupply ChannelRole
  // productSelections - ProductSelectionSetting[]
  /**If empty, all Products in the Project are available in this Store. If not empty, those Product Selections are available in the Store for which the active setting is true.*/
  custom: CustomFields;
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
};

export type LineItem = {
  id: string;
  /**The unique ID of this LineItem.*/
  productId: string;
  productKey: string;
  /**User-defined unique identifier for the Product. Only present on Line Items in a Cart when the key is available on that specific Product at the time the Line Item is created or updated on the Cart. On Order resources this field is only present when the key is available on the specific Product at the time the Order is created from the Cart.
   This field is in general not present on Carts that had no updates until 3 December 2021 and on Orders created before this date.*/
  name: Scalars["LocalizedString"];
  /**The product name.*/
  productSlug: Scalars["LocalizedString"];
  /**The slug of a product is inserted on the fly. It can therefore be used to link to the product detail page of the product. It is empty if the product has been deleted.
   The slug is also empty if the cart or order is retrieved via Reference Expansion or is a snapshot in a Message.*/
  // productType:ProductType
  // variant :ProductVariant
  /**The variant data is saved when the variant is added to the cart, and not updated automatically. It can manually be updated with the Recalculate update action.*/
  price: Price;
  /**The price of a line item is selected from the prices array of the product variant. If the variant field hasn't been updated, the price may not correspond to a price in variant.prices.*/
  //taxedPrice : TaxedItemPrice
  /** Set once the taxRate is set.*/
  totalPrice: CentPrecisionMoney;
  /**The total price of this line item. If the line item is discounted, then the totalPrice is the DiscountedLineItemPriceForQuantity multiplied by quantity. Otherwise the total price is the product price multiplied by the quantity. totalPrice may or may not include the taxes: it depends on the taxRate.includedInPrice property.*/
  quantity: number;
  /**The amount of a LineItem in the cart. Must be a positive integer.*/
  addedAt: Scalars["DateTime"];
  /**When the line item was added to the cart. Optional for backwards compatibility reasons only.*/
  // state :ItemState[]
  //  taxRate :TaxRate
  /**Will be set automatically in the Platform TaxMode once the shipping address is set is set. For the External tax mode the tax rate has to be set explicitly with the ExternalTaxRateDraft.*/
  // supplyChannel :Channel
  /**The supply channel identifies the inventory entries that should be reserved. The Channel must have the InventorySupply ChannelRoleEnum. If the cart is bound to a Store with supplyChannels set, the channel has to match one of the store's supply channels.*/
  // distributionChannel :Channel
  /**The distribution channel is used to select a ProductPrice. The Channel has ProductDistribution ChannelRoleEnum If the cart is bound to a Store with distributionChannels set, the channel has to match one of the store's distribution channels.*/
  // discountedPricePerQuantity : DiscountedLineItemPriceForQuantity[]
  // priceMode : LineItemPriceMode
  // lineItemMode : LineItemMode
  custom: CustomFields;
  // shippingDetails : ItemShippingDetails
  /**Container for line item specific address(es).*/
  lastModifiedAt: Scalars["DateTime"];
  /**The date when the LineItem was last modified by one of the following actions: setLineItemShippingDetails, addLineItem, removeLineItem, or changeLineItemQuantity. Optional only for backwards compatible reasons. When the LineItem is created lastModifiedAt is set to addedAt.*/
};

export type Cart = {
  id: string;
  /**The unique ID of the cart.*/
  key: string;
  /**User-specific unique identifier of the cart.*/
  version: number;
  /**The current version of the cart.*/
  createdAt: Scalars["DateTime"];
  createdBy: CreatedBy;
  /**Present on resources created after 2019-02-01 except for events not tracked.*/
  lastModifiedAt: Scalars["DateTime"];
  lastModifiedBy: LastModifiedBy;
  /**Present on resources updated after 2019-02-01 except for events not tracked.*/
  customerId: string;
  customerEmail: string;
  anonymousId: string;
  /**Identifies carts and orders belonging to an anonymous session (the customer has not signed up/in yet).*/
  store: Store;
  lineItems: LineItem[];
  customLineItems: CustomLineItem[];
  totalLineItemQuantity: number;
  /**The sum off all the lineItems quantities. Does not take customLineItems into consideration.*/
  totalPrice: CentPrecisionMoney;
  /**The sum of all totalPrice fields of the lineItems and customLineItems, as well as the price field of shippingInfo (if it exists). totalPrice may or may not include the taxes: it depends on the taxRate.includedInPrice property of each price.*/
  // taxedPrice: TaxedPrice
  /**Not set until the shipping address is set. Will be set automatically in the Platform TaxMode. For the External tax mode it will be set as soon as the external tax rates for all line items, custom line items, and shipping in the cart are set.*/
  // cartState : CartState
  shippingAddress: Address;
  /**The shipping address is used to determine the eligible shipping methods and rates as well as the tax rate of the line items.*/
  billingAddress: Address;
  inventoryMode: InventoryMode;
  // taxMode :TaxMode
  // taxRoundingMode : RoundingMode
  /**When calculating taxes for taxedPrice, the selected mode is used for rounding.*/
  // taxCalculationMode : TaxCalculationMode
  /**When calculating taxes for taxedPrice, the selected mode is used for calculating the price with LineItemLevel (horizontally) or UnitPriceLevel (vertically) calculation mode.*/
  // customerGroup : CustomerGroup
  /**Set automatically when the customer is set and the customer is a member of a customer group. Used for product variant price selection.*/
  country: string;
  /** A two-digit country code as perISO 3166-1 alpha-2. Used for product variant price selection.*/
  // shippingInfo :shippingInfo
  /**Set automatically once the ShippingMethod is set.*/
  // discountCodes :DiscountCodeInfo[]
  // refusedGifts :CartDiscounts[]
  /**Automatically filled when a line item with LineItemMode GiftLineItem is removed from the cart.*/
  custom: CustomFields;
  // paymentInfo :PaymentInfo
  locale: string;
  /**String conforming toIETF language tag*/
  deleteDaysAfterLastModification: number;
  /**The cart will be deleted automatically if it hasn't been modified for the specified amount of days.*/
  // shippingRateInput :ShippingRateInput
  /**The shippingRateInput is used as an input to select a ShippingRatePriceTier.*/
  origin: CartOrigin;
  /**The origin field indicates how this cart was created. The value Customer indicates, that the cart was created by the customer.*/
  itemShippingAddresses: Address[];
  /**Contains addresses for carts with multiple shipping addresses. Line items reference these addresses under their shippingDetails. The addresses captured here are not used to determine eligible shipping methods or the applicable tax rate. Only the cart's shippingAddress is used for this.*/
};

export type Price = {
  id: string;
  /**The unique ID of this price.*/
  value: CentPrecisionMoney | HighPrecisionMoney;
  country: string;
  /** A two-digit country code as perISO 3166-1 alpha-2.*/
  // customerGroup :CustomerGroup
  /**A reference to a customer group.*/
  // channel :Channel
  /**A reference to a channel.*/
  validFrom: Scalars["DateTime"];
  /**Date from which the price is valid.*/
  validUntil: Scalars["DateTime"];
  /**Date until which the price is valid.*/
  // tiers :PriceTier[]
  // discounted :DiscountedPrice
  /**Set if a matching ProductDiscount exists. If set, the Cart will use the discounted value for the cart price calculation.
   When a relative discount is applied and the fraction part of the discounted price is 0.5, the discounted price is rounded in favor of the customer with the
   half down rounding.*/
  custom: CustomFields;
};

export type ProductVariantAvailability = {
  isOnStock: boolean;
  restockableInDays: number;
  /**The number of days it takes to restock a product once it is out of stock.*/
  availableQuantity: number;
  /**The number of items of this product variant that are currently available in stock
   isOnStock, restockableInDays and quantityOnStock are based on the Inventory Entry with no supply channel for this variant.*/
  // channels - Map of ProductVariantAvailability per Channel id
  /**For each Inventory Entries with a supply channel, an entry is added into channels:
   the key is the Channel id
   the value is an object containing the data isOnStock, restockableInDays and availableQuantity for the Inventory Entry with the supply channel for this variant.*/
};

/**Scoped price is returned as a part of a variant in product search (when price selector is used).*/
export type ScopedPrice = {
  id: string;
  /**The unique ID of this price.*/
  value: CentPrecisionMoney | HighPrecisionMoney;
  currentValue: CentPrecisionMoney | HighPrecisionMoney;
  /**either the original price value or the discounted value, if it's available*/
  country: string;
  /**A two-digit country code as perISO 3166-1 alpha-2.*/
  // customerGroup :CustomerGroup
  /**A reference to a customer group.*/
  // channel :Channel
  /**A reference to a channel.*/
  validFrom: Scalars["DateTime"];
  /**Date from which the price is valid.*/
  validUntil: Scalars["DateTime"];
  /**Date until which the price is valid.*/
  // discounted :DiscountedPrice
  /**Is set if a matching ProductDiscount exists. If set, the Cart will use the discounted value for the cart price calculation.
   When a relative discount is applied and the fraction part of the discounted price is 0.5, the discounted price is rounded in favor of the customer with the
   half down rounding.*/
  custom: CustomFields;
};
