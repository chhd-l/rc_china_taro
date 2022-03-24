// import { Address } from "./customers";
import { Order } from "./orders"
import { Scalars } from '../schema/common.schema'
import { Price } from './prices'

export type Subscription = {
    createTime: Scalars['DateTime']
    subscriptionNumber: string
    subscriptionStatus: number
    productList: SubscriptionProductItem[]
    nextshipment?: Order[]
    completed?: Order[]
    // deliveryAddress?: Address//商品行上有，这里不需要展示了吧
    // billingAddress?: Address
    //   payPaymentInfo?: CardInfo
    paymentId?: string
    // billingAddressId?: string
    // deliveryAddressId?: string
    // changeField?: string
}
export type SubscriptionProductItem = {
    nextDeliveryTime: Scalars['DateTime']
    firstDeliveryTime: Scalars['DateTime']
    subscribeGoodsId: string
    periodTypeId: string
    subscribeNum: number
    originalPrice: Price
    subscribePrice: Price
}

