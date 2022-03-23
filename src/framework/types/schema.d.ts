/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  DateTime: any
  /** An ISO-8601 encoded UTC date time string. Example value: `"2019-07-03T20:47:55Z"`. */
  LocalizedString:any
}

export type Address = {
  country: string;
  /**A two:digit country code as perISO 3166:1 alpha:2.*/
  id: string;
  key: string;
  /**User-defined identifier for the address. If given, it must follow the pattern [a:zA:Z0:9_\:]{2,256}.*/
  title: string;
  salutation: string;
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  additionalStreetInfo: string;
  postalCode: string;
  city: string;
  region: string;
  state: string;
  company: string;
  department: string;
  building: string;
  apartment: string;
  pOBox: string;
  phone: string;
  mobile: string;
  email: string;
  fax: string;
  additionalAddressInfo: string;
  externalId: string;
  custom: CustomFields;
};

export type CustomFields = {
  //todo
};

/**CreatedBy same as LastModifiedBy */
export type CreatedOrLastModifiedBy={
  clientId :string
  /**The ID of the API Client which created a resource.*/
    externalUserId :string
  /**External user ID provided by X-External-User-ID HTTP Header. Maximum length is 128 characters.*/
    customer :Customer
  /**Present when creating a resource using a token from the password flow.*/
  anonymousId :string
  /**Present when creating a resource using a token from an anonymous session.*/
}

export type Store={
  id :string
  version :number
  key :string
  /**User-specific unique identifier for the store. The key is mandatory and immutable. It is used to reference the store.*/
  name : Scalars['LocalizedString']
  /**The name of the store*/
  languages :string[]
  /**IETF language tag.*/
  //todo
  // distributionChannels - Set of Reference to a Channel with ProductDistribution ChannelRole
  // supplyChannels - Set of Reference to a Channel with InventorySupply ChannelRole
  // productSelections - ProductSelectionSetting[]
  /**If empty, all Products in the Project are available in this Store. If not empty, those Product Selections are available in the Store for which the active setting is true.*/
  custom : CustomFields
  createdAt :Scalars['DateTime']
  lastModifiedAt :Scalars['DateTime']
}

export type CentOrHighPrecisionMoney = {
  type?: "centPrecision" | "highPrecision";
  currencyCode: string;
  centAmount: number;
  preciseAmount?: number;
  fractionDigits?: number;
};

export type LineItem={
  id :string
  /**The unique ID of this LineItem.*/
  productId :string
  productKey :string
  /**User-defined unique identifier for the Product. Only present on Line Items in a Cart when the key is available on that specific Product at the time the Line Item is created or updated on the Cart. On Order resources this field is only present when the key is available on the specific Product at the time the Order is created from the Cart.
  This field is in general not present on Carts that had no updates until 3 December 2021 and on Orders created before this date.*/
  name : Scalars['LocalizedString']
  /**The product name.*/
  productSlug : Scalars['LocalizedString']
  /**The slug of a product is inserted on the fly. It can therefore be used to link to the product detail page of the product. It is empty if the product has been deleted.
  The slug is also empty if the cart or order is retrieved via Reference Expansion or is a snapshot in a Message.*/
  // productType:ProductType
  // variant :ProductVariant
  /**The variant data is saved when the variant is added to the cart, and not updated automatically. It can manually be updated with the Recalculate update action.*/
  price : CentOrHighPrecisionMoney
  /**The price of a line item is selected from the prices array of the product variant. If the variant field hasn't been updated, the price may not correspond to a price in variant.prices.*/
  //taxedPrice : TaxedItemPrice
 /** Set once the taxRate is set.*/
  totalPrice : CentOrHighPrecisionMoney
  /**The total price of this line item. If the line item is discounted, then the totalPrice is the DiscountedLineItemPriceForQuantity multiplied by quantity. Otherwise the total price is the product price multiplied by the quantity. totalPrice may or may not include the taxes: it depends on the taxRate.includedInPrice property.*/
  quantity : number
  /**The amount of a LineItem in the cart. Must be a positive integer.*/
  addedAt: Scalars['DateTime']
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
  custom : CustomFields
  // shippingDetails : ItemShippingDetails
  /**Container for line item specific address(es).*/
  lastModifiedAt:Scalars['DateTime']
  /**The date when the LineItem was last modified by one of the following actions: setLineItemShippingDetails, addLineItem, removeLineItem, or changeLineItemQuantity. Optional only for backwards compatible reasons. When the LineItem is created lastModifiedAt is set to addedAt.*/
}

export type Cart={
  id :string
  /**The unique ID of the cart.*/
  key :string
  /**User-specific unique identifier of the cart.*/
  version :number
  /**The current version of the cart.*/
  createdAt : Scalars['DateTime']
  createdBy : CreatedOrLastModifiedBy
  /**Present on resources created after 2019-02-01 except for events not tracked.*/
  lastModifiedAt : Scalars['DateTime']
  lastModifiedBy : CreatedOrLastModifiedBy
  /**Present on resources updated after 2019-02-01 except for events not tracked.*/
  customerId :string
  customerEmail :string
  anonymousId :string
  /**Identifies carts and orders belonging to an anonymous session (the customer has not signed up/in yet).*/
  store :  Store
  lineItems : LineItem[]
  // customLineItems :CustomLineItem[]
  totalLineItemQuantity :number
  /**The sum off all the lineItems quantities. Does not take customLineItems into consideration.*/
  totalPrice : CentOrHighPrecisionMoney
  /**The sum of all totalPrice fields of the lineItems and customLineItems, as well as the price field of shippingInfo (if it exists). totalPrice may or may not include the taxes: it depends on the taxRate.includedInPrice property of each price.*/
  // taxedPrice: TaxedPrice
  /**Not set until the shipping address is set. Will be set automatically in the Platform TaxMode. For the External tax mode it will be set as soon as the external tax rates for all line items, custom line items, and shipping in the cart are set.*/
  // cartState : CartState
  shippingAddress :Address
  /**The shipping address is used to determine the eligible shipping methods and rates as well as the tax rate of the line items.*/
  billingAddress : Address
  // inventoryMode : InventoryMode
  // taxMode :TaxMode
  // taxRoundingMode : RoundingMode
  /**When calculating taxes for taxedPrice, the selected mode is used for rounding.*/
  // taxCalculationMode : TaxCalculationMode
  /**When calculating taxes for taxedPrice, the selected mode is used for calculating the price with LineItemLevel (horizontally) or UnitPriceLevel (vertically) calculation mode.*/
  // customerGroup : CustomerGroup
  /**Set automatically when the customer is set and the customer is a member of a customer group. Used for product variant price selection.*/
  country :string
 /** A two-digit country code as perISO 3166-1 alpha-2. Used for product variant price selection.*/
  // shippingInfo :shippingInfo
  /**Set automatically once the ShippingMethod is set.*/
  // discountCodes :DiscountCodeInfo[]
  // refusedGifts :CartDiscounts[]
  /**Automatically filled when a line item with LineItemMode GiftLineItem is removed from the cart.*/
  custom : CustomFields
  // paymentInfo :PaymentInfo
  locale :string
  /**String conforming toIETF language tag*/
  deleteDaysAfterLastModification :number
  /**The cart will be deleted automatically if it hasn't been modified for the specified amount of days.*/
  // shippingRateInput :ShippingRateInput
  /**The shippingRateInput is used as an input to select a ShippingRatePriceTier.*/
  // origin : CartOrigin
  /**The origin field indicates how this cart was created. The value Customer indicates, that the cart was created by the customer.*/
  itemShippingAddresses :Address[]
  /**Contains addresses for carts with multiple shipping addresses. Line items reference these addresses under their shippingDetails. The addresses captured here are not used to determine eligible shipping methods or the applicable tax rate. Only the cart's shippingAddress is used for this.*/
}

export type Customer={
  id :string
  /**The unique ID of the customer.*/
  customerNumber :string
  /**The customer number can be used to create a more human-readable (in contrast to ID) identifier for the customer. It should be unique across a project. Once the field was set it cannot be changed anymore.*/
  key :string
  /**User-specific unique identifier for a customer. Must be unique across a project. The field can be reset using the Set Key UpdateAction*/
  version :number
  /**The current version of the customer.*/
  createdAt : Scalars['DateTime']
  createdBy : CreatedOrLastModifiedBy
 /** Present on resources created after 2019-02-01 except for events not tracked.*/
  lastModifiedAt : Scalars['DateTime']
  lastModifiedBy : CreatedOrLastModifiedBy
  /**Present on resources updated after 2019-02-01 except for events not tracked.*/
  email :string
  /**The customer's email address and the main identifier of uniqueness for a customer account. Email addresses are either unique to the store they're specified for, or for the entire project. For more information, see Email uniqueness.*/
  password :string
  /**when authenticationMode is set to ExternalAuth.*/
  stores :Store
 /** References to the stores the customer account is associated with. If no stores are specified, the customer is a global customer, and can log in using the Password Flow for global Customers. If one or more stores are specified, the customer can only log in using the Password Flow for Customers in a Store for those specific stores.*/
  firstName :string
  lastName :string
  middleName :string
  title :string
  salutation :string
  dateOfBirth : Date
  companyName :string
  vatId :string
  addresses :Address[]
  /**The addresses have unique IDs in the addresses list*/
  defaultShippingAddressId :string
  /**The address ID in the addresses list*/
  shippingAddressIds :[]
  /**The IDs from the addresses list which are used as shipping addresses*/
  defaultBillingAddressId :string
  /**The address ID in the addresses list*/
  billingAddressIds :[]
  /**The IDs from the addresses list which are used as billing addresses*/
  isEmailVerified : Boolean
  externalId :string
  // customerGroup : CustomerGroup
  custom : CustomFields
  locale :string
  /**String conforming to IETF language tag*/
  // authenticationMode : AuthenticationMode
  /**Indicates whether the password is required for the Customer.*/
}
