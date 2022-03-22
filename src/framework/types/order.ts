import { CentOrHighPrecisionMoney, TaxedPrice, LineItem } from "./common";
import { Address } from "./address";

export type OrderItem = {
  id: string;
  orderNumber: string;
  customerId: string;
  customerEmail: string;
  lineItems: LineItem[]; //对应fgs order tradeItem
  totalPrice: CentOrHighPrecisionMoney;
  taxedPrice: TaxedPrice;
  shippingAddress: Address; //送货地址
  billingAddress: Address; //账单地址
  orderState: OrderState;
  paymentState: PaymentState;
  paymentInfo:PaymentInfo
};

export enum OrderState {
  "Open" = "Open",
  "Confirmed" = "Confirmed",
  "Complete" = "Complete",
  "Cancelled" = "Cancelled",
}

export enum PaymentState {
  "BalanceDue" = "BalanceDue",
  "Failed" = "Failed",
  "Pending" = "Pending",
  "CreditOwed" = "CreditOwed",
  "Paid" = "paid",
}

export enum PaymentInfo{

}
