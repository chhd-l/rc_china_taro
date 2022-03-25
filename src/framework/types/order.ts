import {
  CentPrecisionMoney,
  CreatedBy,
  LastModifiedBy,
  Scalars,
} from "../schema/common.schema";
import { LineItem, Store, State, TaxedPrice } from "./cart";
import { CartOrigin, OrderState, PaymentState, ShipmentState } from "../enum";
import { Payment } from "./payment";
import { Address } from "./customer";

export type Order = {
  id: string;
  createdAt: Scalars["DateTime"];
  createdBy: CreatedBy;
  lastModifiedAt: Scalars["DateTime"];
  lastModifiedBy: LastModifiedBy;
  completedAt: Scalars["DateTime"];
  orderNumber: string;
  customerId: string;
  customerEmail: string;
  anonymousId: string;
  store: Store;
  lineItems: LineItem[];
  shippingAddress: Address;
  billingAddress: Address;
  orderState: OrderState;
  state: State;
  shipmentState: ShipmentState;
  paymentState: PaymentState;
  // shippingInfo:ShippingInfo
  // returnInfo : ReturnInfo[]
  // discountCodes : DiscountCodeInfo[]
  // refusedGifts : CartDiscounts[]
  paymentInfo: Payment[];
  origin: CartOrigin;
  totalPrice: CentPrecisionMoney;
  taxedPrice: TaxedPrice;
  subscriptionDiscountPrice?: number;
  subtotalPrice?: number
  // discount:Discount[]
};
