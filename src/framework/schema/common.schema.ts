import { Customer } from "./customers.schema";

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  DateTime: any;
  /** An ISO-8601 encoded UTC date time string. Example value: `"2019-07-03T20:47:55Z"`. */
  LocalizedString: any;
  /** A JSON object where the keys are ofIETF language tag, and the values are the corresponding strings used for that language.*/
};

export type CustomFields = {
  //todo
};

export type CreatedBy = {
  clientId: string;
  /**The ID of the API Client which created a resource.*/
  externalUserId: string;
  /**External user ID provided by X-External-User-ID HTTP Header. Maximum length is 128 characters.*/
  customer: Customer;
  /**Present when creating a resource using a token from the password flow.*/
  anonymousId: string;
  /**Present when creating a resource using a token from an anonymous session.*/
};

export type LastModifiedBy = {
  clientId: string;
  /**The ID of the API Client which created a resource.*/
  externalUserId: string;
  /**External user ID provided by X-External-User-ID HTTP Header. Maximum length is 128 characters.*/
  customer: Customer;
  /**Present when creating a resource using a token from the password flow.*/
  anonymousId: string;
  /**Present when creating a resource using a token from an anonymous session.*/
};

export type CentPrecisionMoney = {
  type: "centPrecision";
  currencyCode: string;
  centAmount: number;
  /**The smallest indivisible unit of a currency, such as, cents for USD or centime for CHF. The centAmount value for currencies without minor units (like JPY) excludes the fraction digits. For example, 5 JPY is specified as 5, whereas 5 CHF is specified as 500.*/
  preciseAmount: number;
  /**The number of default fraction digits for the given currency, like 2 for EUR or 0 for JPY.*/
};

export type HighPrecisionMoney = {
  type: "centPrecision" | "highPrecision";
  currencyCode: string;
  centAmount: number;
  /**The amount in cents (the smallest indivisible unit of the currency) calculated by the commercetools Platform based on the preciseAmount provided by the client using the default rounding mode half even.*/
  preciseAmount: number;
  /**The amount in 1 / (10 ^ fractionDigits) of a currency. */
  fractionDigits: number;
  /**The number of fraction digits for a specified high precision money. Can't be less than or equal to the default number of fraction digits for the given currency. The maximum amount of fractionDigits is 20.*/
};

export type CustomLineItem = {
  id: string;
  /**The unique ID of this CustomLineItem.*/
  name: Scalars["LocalizedString"];
  /**The name of this CustomLineItem.*/
  money: CentPrecisionMoney | HighPrecisionMoney;
  /**The cost to add to the cart. The amount can be negative.*/
  // taxedPrice : TaxedItemPrice
  /**Set once the taxRate is set.*/
  totalPrice: CentPrecisionMoney;
  /**The total price of this custom line item. If custom line item is discounted, then the totalPrice would be the discounted custom line item price multiplied by quantity. Otherwise a total price is just a money multiplied by the quantity. totalPrice may or may not include the taxes: it depends on the taxRate.includedInPrice property.*/
  slug: string;
  /** A unique String in the cart to identify this CustomLineItem.*/
  quantity: number;
  /**The amount of a CustomLineItem in the cart. Must be a positive integer.*/
  // state :ItemState[]
  // taxCategory :TaxCategory
  // taxRate : TaxRate
  /**Will be set automatically in the Platform TaxMode once the shipping address is set is set. For the External tax mode the tax rate has to be set explicitly with the ExternalTaxRateDraft.*/
  // discountedPricePerQuantity:DiscountedLineItemPriceForQuantity[]
  custom: CustomFields;
  // shippingDetails : ItemShippingDetails
  /**Container for custom line item specific address(es).*/
};
