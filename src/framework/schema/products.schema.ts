import {
    Scalars,
    ProductKeyReference,
    Asset,
    Image,
    TaxCategoryKeyReference
} from "./common.schema";
import { Price, ScopedPrice } from './prices.schema'
import { AttributeConstraint } from '../enum'
export type Product = {
    id: string
    key: string
    version: number
    createdAt: Scalars["DateTime"]
    createdBy: Scalars["DateTime"]
    lastModifiedAt: Scalars["DateTime"]
    lastModifiedBy: Scalars["DateTime"]
    productType: ProductKeyReference
    masterData: ProductCatalogData
    taxCategory: TaxCategoryKeyReference
}

export type ProductType = {
    id: string
    key: string
    version: number
    createdAt: Scalars["DateTime"]
    createdBy: Scalars["DateTime"]
    lastModifiedAt: Scalars["DateTime"]
    lastModifiedBy: Scalars["DateTime"]
    name: string
    description: string
    attributes: AttributeDefinition[]
}

export type AttributeDefinition = {
    type: string
    name: string
    label: Scalars["LocalizedString"]
    isRequired: boolean
    attributeConstraint: AttributeConstraint
    inputTip: Scalars["LocalizedString"]
    // inputHint
    isSearchable: boolean
}

export type ProductCatalogData = {
    published: boolean
    // Whether the product is published.
    current: ProductData
    // The current data of the product.
    staged: ProductData
    // The staged data of the product.
    hasStagedChanges: boolean
    // Whether the staged data is different from the current data.
}
export type ProductData = {
    name: Scalars["LocalizedString"]
    categories
    // References to categories the product is in.
    categoryOrderHints?
    description?: Scalars["LocalizedString"]
    slug: Scalars["LocalizedString"]
    // Human-readable identifiers usually used as deep-link URL to the related product. Each slug is unique across a project, but a product can have the same slug for different languages.
    // For good performance, indexes are provided for the first 15 languages set on the Project.
    metaTitle?: Scalars["LocalizedString"]
    metaDescription?: Scalars["LocalizedString"]
    metaKeywords?: Scalars["LocalizedString"]
    masterVariant: ProductVariant
    variants: ProductVariant[]
    searchKeywords: SearchKeywords
}
export type ProductVariant = {
    id: number
    // The sequential ID of the variant within the product.
    sku?: string
    // The unique SKU of the variant.
    key: string
    // User-specific unique identifier for the variant. Product variant keys are different from product keys.
    prices?: Price[]
    // The prices of the variant. The prices does not contain two prices for the same price scope (same currency, country, customer group and channel).
    attributes?: Attribute[]
    price?: Price
    // Only appears when price selection is used. This field cannot be used in a query predicate.
    images?: Image[]
    assets?: Asset[]
    availability?: ProductVariantAvailability
    // The availability is set if the variant is tracked by the inventory. The field might not contain the latest inventory state (it is eventually consistent) and can be used as an optimization to reduce calls to the inventory service.
    isMatchingVariant?: boolean
    // Only appears in response to a Product Projection Search request to mark this variant as one that matches the search query.
    scopedPrice?: ScopedPrice
    // Only appears in response to a Product Projection Search with price selection. Can be used to sort, filter and facet.
    scopedPriceDiscounted?: boolean
    // Only appears in response to a Product Projection Search request when price selection is used.
}
export type ProductVariantAvailability = {
    isOnStock?: boolean
    restockableInDays?: number
    // The number of days it takes to restock a product once it is out of stock.
    availableQuantity?: number
    // The number of items of this product variant that are currently available in stock
    // isOnStock, restockableInDays and quantityOnStock are based on the Inventory Entry with no supply channel for this variant.
    // channels?
}
export type Attribute = {
    name;
    value: AttributeDefinition;
}
export type SearchKeywords = {
    [key: string]: SearchKeyword[];
}
export type SearchKeyword = {
    /**
     *
     */
    text: string;
    /**
     *	The tokenizer defines the tokens that are used to match against the [Suggest Query](/../products-suggestions#suggest-query) input.
     *
     */
    suggestTokenizer?: SuggestTokenizer;
}
/**
 *	The tokenizer defines the tokens that are used to match against the [Suggest Query](/../products-suggestions#suggest-query) input.
 *
 */
export declare type SuggestTokenizer = CustomTokenizer | WhitespaceTokenizer;
export type CustomTokenizer = {
    type: 'custom';
    /**
     *
     */
    inputs: string[];
}
export type WhitespaceTokenizer = {
    type: 'whitespace';
}