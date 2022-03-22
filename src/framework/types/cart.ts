import {LineItem, CentOrHighPrecisionMoney, TaxedPrice} from "./common";

export type Carts= {
  id: string;
  customerId?: string;
  customerEmail?: string;
  lineItems: LineItem[]; //product items
  totalPrice: CentOrHighPrecisionMoney;
  taxedPrice?:TaxedPrice
}
