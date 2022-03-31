import { CustomerGroupKeyReference, ChannelKeyReference, Scalars, CustomFields } from './common.schema'
export type Price = {
    id: string
    // The unique ID of this price.
    value: CentPrecisionMoney
    country?: string
    // A two-digit country code as per 
    // ISO 3166-1 alpha-2
    customerGroup?: CustomerGroupKeyReference
    // A reference to a customer group.
    channel?: ChannelKeyReference
    // A reference to a channel.
    validFrom?: Scalars["DateTime"]
    // Date from which the price is valid.
    validUntil?: Scalars["DateTime"]
    // Date until which the price is valid.
    tiers?: PriceTier[]
    discounted?: DiscountedPrice[]
    // Set if a matching ProductDiscount exists. If set, the Cart will use the discounted value for the cart price calculation.
    // When a relative discount is applied and the fraction part of the discounted price is 0.5, the discounted price is rounded in favor of the customer with the 
    // half down rounding
    custom?: CustomFields
}
export type ScopedPrice = {
    id: string
    // The unique ID of this price.
    value: TypedMoney
    currentValue: TypedMoney
    // either the original price value or the discounted value, if it's available
    country?: string
    // A two-digit country code as per 
    // ISO 3166-1 alpha-2
    customerGroup?: CustomerGroupKeyReference
    // A reference to a customer group.
    channel?: ChannelKeyReference
    // A reference to a channel.
    validFrom?: Scalars["DateTime"]
    // Date from which the price is valid.
    validUntil?: Scalars["DateTime"]
    // Date until which the price is valid.
    discounted?: DiscountedPrice
    // Is set if a matching ProductDiscount exists. If set, the Cart will use the discounted value for the cart price calculation.
    // When a relative discount is applied and the fraction part of the discounted price is 0.5, the discounted price is rounded in favor of the customer with the 
    // half down rounding
    custom?: CustomFields
}
export type CentPrecisionMoney = {
    type: string;
    currencyCode: string;
    centAmount: string;
    fractionDigits: string;
}

export type PriceTier = {
    /**
     *	The minimum quantity this price tier is valid for.
     *
     *
     */
    minimumQuantity: number;
    /**
     *	The currency of a price tier is always the same as the currency of the base Price.
     *
     */
    value: TypedMoney;
}
export type DiscountedPrice = {
    /**
     *
     */
    value: TypedMoney;
    /**
     *	Reference to a ProductDiscount.
     *
     */
    discount: ProductDiscountKeyReference;
}

export type ProductDiscountKeyReference = {
    typeId: 'product-discount';
    /**
     *
     */
    key: string;
}
export type TypedMoney = HighPrecisionMoney | Money;
export type HighPrecisionMoney = {
    type: 'highPrecision';
    /**
     *
     */
    fractionDigits?: number;
    /**
     *
     */
    centAmount: number;
    /**
     *	The currency code compliant to [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217).
     *
     *
     */
    currencyCode: string;
    /**
     *
     */
    preciseAmount: number;
}
export type Money = {
    type: 'centPrecision';
    /**
     *
     */
    fractionDigits?: number;
    /**
     *
     */
    centAmount: number;
    /**
     *	The currency code compliant to [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217).
     *
     *
     */
    currencyCode: string;
}