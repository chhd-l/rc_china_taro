import { Scalars, ProductKeyReference, Asset, Image, TaxCategoryKeyReference } from './common.schema'
import { Price, ScopedPrice } from './prices.schema'
import { AttributeConstraint } from '../enum'
export enum IsSupport100 {
  Yes = 'YES',
  No = 'No',
}
export enum GoodsType {
  Bundle = 'BUNDLE',
  Regular = 'REGULAR',
  Other = 'OTHER',
}
export enum IsShelves {
  OnShelves = 'ON_SHELVES',
  OffShleves = 'OFF_SHELVES',
  Other = 'OTHER',
}
export interface GoodsSpecificationDetail {
  id: string
  // goodsId: string
  goodsSpecificationId: string
  specificationDetailName: string
  // specificationDetailNameEn: string
  // storeId: string
  // lastModifiedBy: string
  // createdAt: string
  // createdBy: string
  // lastModifiedAt: string
  // iDeleted: string
}
export interface GoodsSpecification {
  id: string
  // GoodsId: string
  specificationName: string
  specificationNameEn: string
  goodsSpecificationDetail: GoodsSpecificationDetail[]
  // createdAt: string
  // createdBy: string
  // lastModifiedAt: string
  // lastModifiedBy: string
  // isDeleted: Boolean
}
export interface GoodsSpecificationValueRel {
  goodsSpecificationId: string
  goodsSpecificationDetailId: string
  // goodsVariantId: string
  id: string
}
export interface GoodsVariants {
  id: string
  // goodsId: string
  skuNo: string
  stock: number
  eanCode: string
  name: string
  // skuType: number
  marketingPrice: number // 当前价格
  listPrice: number // 划线价
  // shelvesStatus: IsShelves
  // shelvesTime: string
  // storeId: string
  defaultImage: string
  // subscriptionStatus: number //？？
  feedingDays: number //？？
  // subscriptionPrice: number //？？
  // created_at: string
  // created_by: string
  // last_modified_at: string
  // last_modified_by: string
  // is_deleted: string //？？
  goodsSpecificationRel: GoodsSpecificationValueRel[]
}
export interface GoodsAssets {
  // id: string
  // goodsId: string
  // goodsVariantId: string
  artworkUrl: string
  // type: string
  // storeId: string
  // createdAt: string
  // is_default: string
  // createdBy: string
  // lastModifiedAt: string
  // lastModifiedBy: string
}

export interface GoodsAttributeAndValue {
  attributeName: string
  attributeNameEn: string
  attributeValueName: string
  attributeValueNameEn: string
  // id: string
  goodsId: string
}
export interface Goods {
  id: string
  spuNo: string
  goodsName: string
  // cardName: string  //？？
  goodsDescription: string
  // isSupport100: IsSupport100 //？？
  type: string
  // brandId: string //？？
  // goodsCategoryId: string //？？
  // shelvesStatus: IsShelves
  // defaultImage: string//？？
  // salesStatus: number //？？
  // weight: number //？？
  // weightUnit: string //？？
  // parcelSizeLong: string
  // parcelSizeIongunit: string
  // parcelSizeHeight: string
  // parcelSizeHeightUnit: string
  // parcelSizeWeight: string
  // parcelSizeWeightUnit: string
  // storeId: string  //？？
  // created_at: string
  // created_by: string
  // last_modified_at: string
  // last_modified_by: string
  // is_deleted: number//？？
  goodsSpecifications: GoodsSpecification[]
  goodsVariants: GoodsVariants[]
  goodsAsserts: GoodsAssets[]
  goodsAttributeValueRel: GoodsAttributeAndValue[] //？？
}

export type Product = {
  id: string
  key: string
  version: number
  createdAt: Scalars['DateTime']
  createdBy: Scalars['DateTime']
  lastModifiedAt: Scalars['DateTime']
  lastModifiedBy: Scalars['DateTime']
  productType: ProductKeyReference
  masterData: ProductCatalogData
  taxCategory: TaxCategoryKeyReference
}

export type ProductType = {
  id: string
  key: string
  version: number
  createdAt: Scalars['DateTime']
  createdBy: Scalars['DateTime']
  lastModifiedAt: Scalars['DateTime']
  lastModifiedBy: Scalars['DateTime']
  name: string
  description: string
  attributes: AttributeDefinition[]
}

export type AttributeDefinition = {
  type: string
  name: string
  label: Scalars['LocalizedString']
  isRequired: boolean
  attributeConstraint: AttributeConstraint
  inputTip: Scalars['LocalizedString']
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
  name: Scalars['LocalizedString']
  categories
  // References to categories the product is in.
  categoryOrderHints?
  description?: Scalars['LocalizedString']
  slug: Scalars['LocalizedString']
  // Human-readable identifiers usually used as deep-link URL to the related product. Each slug is unique across a project, but a product can have the same slug for different languages.
  // For good performance, indexes are provided for the first 15 languages set on the Project.
  metaTitle?: Scalars['LocalizedString']
  metaDescription?: Scalars['LocalizedString']
  metaKeywords?: Scalars['LocalizedString']
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
  name
  value: AttributeDefinition
}
export type SearchKeywords = {
  [key: string]: SearchKeyword[]
}
export type SearchKeyword = {
  /**
   *
   */
  text: string
  /**
   *	The tokenizer defines the tokens that are used to match against the [Suggest Query](/../products-suggestions#suggest-query) input.
   *
   */
  suggestTokenizer?: SuggestTokenizer
}
/**
 *	The tokenizer defines the tokens that are used to match against the [Suggest Query](/../products-suggestions#suggest-query) input.
 *
 */
export declare type SuggestTokenizer = CustomTokenizer | WhitespaceTokenizer
export type CustomTokenizer = {
  type: 'custom'
  /**
   *
   */
  inputs: string[]
}
export type WhitespaceTokenizer = {
  type: 'whitespace'
}
