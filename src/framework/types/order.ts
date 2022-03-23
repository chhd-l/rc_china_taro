import { TaxedPrice } from "./common";
import { Address } from "./address";
import {
  CentOrHighPrecisionMoney,
  CreatedOrLastModifiedBy,
  Scalars,
  State,
  Store,
} from "./schema";
import { LineItem } from "./cart";
import { CartOrigin, OrderState, PaymentState, ShipmentState } from "./enum";

export type OrderItem = {
  id: string;
  createdAt: Scalars["DateTime"];
  createdBy: CreatedOrLastModifiedBy;
  lastModifiedAt: Scalars["DateTime"];
  lastModifiedBy: CreatedOrLastModifiedBy;
  completedAt: Scalars["DateTime"];
  orderNumber: string;
  customerId: string;
  customerEmail: string;
  anonymousId: string;
  store: Store;
  lineItems: LineItem[];
  totalPrice: CentOrHighPrecisionMoney;
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
  // paymentInfo :PaymentInfo
  origin: CartOrigin;
};

export enum PaymentInfo {}
