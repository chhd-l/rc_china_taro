import { Address } from '@/framework/types/customer'

export interface TradeGoodsAttributeAndValue {
  attributeName: string
  attributeNameEn: string
  attributeValueName: string
  attributeValueNameEn: string
  relId: string
  attributeId: string
  attributeValueId: string
  goodsId: string
}

export interface TradeLineItem {
  id: string
  skuNo: string
  spuNo: string
  skuName: string
  spuName: string
  goodsSpecifications: string
  pic: string
  price: string
  num: string
  goodsAttributeAndValues: [TradeGoodsAttributeAndValue]
  feedingDays: number
}

export interface PayInfo {
  payWayCode: string
  payWayOrderID: string
  amount: string
  payStartTime: string
  payFinishTime: string
  lastModifiedBy: string
  paymentState: string
}

export interface TradePrice {
  goodsPrice: number
  deliveryPrice: number
  totalPrice: number
  discountsPrice: number
}

export interface TradeState {
  orderType: string
  orderState: string
  storeId: string
  lastModifiedAt: string
  lastModifiedBy: string
  createdAt: string
  createdBy: string
}

export interface Logs {
  id: string
  status: string
  createdAt: string
  createdBy: string
}

export interface Buyer {
  isMember: boolean
  customerId: string
  customerName: string
  customerEmail: string
  customerLevel: string
  nickName: string
  phone: string
}

export interface Order {
  _id?: string
  orderNumber?: string
  version?: string
  lineItem?: TradeLineItem[]
  shippingAddress: Address
  payInfo?: PayInfo
  isSubscription?: string
  tradePrice: TradePrice
  tradeState?: TradeState
  logs?: Logs
  remark?: string
  buyer?: Buyer
  shippingInfo?: ShippingInfo
}

export interface ShippingInfo {
  shippingTime: string
  expectedShippingDate: string
  shippingCompany: string
  trackingId: string
  isReturn: string
  status: string
  deliveries: DeliveryInfo[]|any
}

export interface DeliveryInfo {
  time: string
  context: string
  areaCode: string
  areaName: string
  status: string
}
