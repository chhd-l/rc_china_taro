import { Consumer } from "./consumer.schema";

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  DateTime: any;
  /** An ISO-8601 encoded UTC date time string. Example value: `"2019-07-03T20:47:55Z"`. */
  LocalizedString: any;
  /** A JSON object where the keys are ofIETF language tag, and the values are the corresponding strings used for that language.*/
};

export type CustomFields = {
  type: TypeKeyReference
  fields?: FieldContainer
};

export type CreatedBy = {
  clientId: string;
  /**The ID of the API Client which created a resource.*/
  externalUserId: string;
  /**External user ID provided by X-External-User-ID HTTP Header. Maximum length is 128 characters.*/
  consumer: Consumer;
  /**Present when creating a resource using a token from the password flow.*/
  anonymousId: string;
  /**Present when creating a resource using a token from an anonymous session.*/
};

export type LastModifiedBy = {
  clientId: string;
  /**The ID of the API Client which created a resource.*/
  externalUserId: string;
  /**External user ID provided by X-External-User-ID HTTP Header. Maximum length is 128 characters.*/
  consumer: Consumer;
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

export type TypeKeyReference = {
  typeId: 'type';
  /**
   *
   */
  key: string;
}
/**
 *	References a product by key.
 */
export type ProductKeyReference = {
  typeId: 'product'
  key: string;
}
/**
 *	References a consumer group by key.
 */
export type ConsumerGroupKeyReference = {
  typeId: 'consumer-group';
  key: string;
}
export type TaxCategoryKeyReference = {
  typeId: 'tax-category';
  /**
   *
   */
  key: string;
}
/**
 *	References a channel by key.
 */
export type ChannelKeyReference = {
  typeId: 'channel';
  /**
   *
   */
  key: string;
}
export type FieldContainer = {
  //todo
}
/**
*	References a product type by key.
*/
export type ProductTypeKeyReference = {
  typeId: 'product-type';
  /**
   *
   */
  key: string;
}
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
}
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
}
export type Asset = {
  /**
   *	User-defined identifier for the asset.
   *	Asset keys are unique inside their container (a product variant or a category).
   *
   *
   */
  key: string;
  /**
   *
   */
  sources: AssetSource[];
  /**
   *	A localized string is a JSON object where the keys are of [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag), and the values the corresponding strings used for that language.
   *	```json
   *	{
   *	  "de": "Hundefutter",
   *	  "en": "dog food"
   *	}
   *	```
   *
   *
   */
  name: Scalars["LocalizedString"];
  /**
   *	A localized string is a JSON object where the keys are of [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag), and the values the corresponding strings used for that language.
   *	```json
   *	{
   *	  "de": "Hundefutter",
   *	  "en": "dog food"
   *	}
   *	```
   *
   *
   */
  description?: Scalars["LocalizedString"];
  /**
   *
   */
  tags?: string[];
  /**
   *	The representation to be sent to the server when creating a resource with custom fields.
   *
   */
  custom?: CustomFields;
}

export type AssetSource = {
  /**
   *
   */
  uri: string;
  /**
   *
   */
  key?: string;
  /**
   *	The width and height of the Asset Source.
   *
   */
  dimensions?: AssetDimensions;
  /**
   *
   */
  contentType?: string;
}