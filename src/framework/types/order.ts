import { CreatedBy, LastModifiedBy, Scalars } from "../schema/common.schema";
import { LineItem, PromotionItem } from "./cart";
import { CartOrigin, OrderState, PaymentState, ShipmentState } from "../enum";
import { Payment } from "./payment";
import { Address } from "./customer";

export type Order = {
  id: string;
  createdAt?: Scalars["DateTime"];
  createdBy?: CreatedBy;
  lastModifiedAt?: Scalars["DateTime"];
  lastModifiedBy?: LastModifiedBy;
  completedAt: Scalars["DateTime"];
  orderNumber: string;
  customerId: string;
  customerEmail: string;
  anonymousId?: string;
  storeId: String;
  lineItems: LineItem[];
  shippingAddress: Address;
  billingAddress: Address;
  orderState: OrderState;
  shipmentState: ShipmentState;
  paymentState: PaymentState;
  paymentInfo: Payment[];
  origin?: CartOrigin; //来源，购物车下单/代客下单
  totalPrice: number;
  taxedPrice: number;
  subscriptionDiscountPrice?: number;
  subtotalPrice?: number;
  promotion: PromotionItem[];
  // discount:Discount[]
  // shippingInfo:ShippingInfo
  // returnInfo : ReturnInfo[]
  // discountCodes : DiscountCodeInfo[]
  // refusedGifts : CartDiscounts[]
};
