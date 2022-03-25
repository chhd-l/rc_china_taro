import {
  CentPrecisionMoney,
  CreatedBy,
  LastModifiedBy,
  Scalars,
} from "../schema/common.schema";
import { LineItem, Store, State, TaxedPrice } from "./carts";
import { CartOrigin, OrderState, PaymentState, ShipmentState } from "../enum";
import { Payment } from "./payments";
import { Address } from "./customers";

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
  totalPrice: CentPrecisionMoney;
  taxedPrice: TaxedPrice;
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
};
