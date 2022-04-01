import {
  CreatedBy,
  LastModifiedBy,
  CustomFields,
  Scalars,
} from "../schema/common.schema";
import { Customer } from "./customer";

export type Payment = {
  id: string;
  createdAt?: Scalars["DateTime"];
  createdBy?: CreatedBy;
  lastModifiedAt?: Scalars["DateTime"];
  lastModifiedBy?: LastModifiedBy;
  customer: Customer;
  anonymousId: string;
  interfaceId: string;
  amountPlanned: number; //How much money this payment intends to receive from the customer. The value usually matches the cart or order gross total.
  paymentMethodInfo: PaymentMethodInfo;
  paymentStatus: PaymentStatus;
  // transactions: Transaction[];//A list of financial transactions of different TransactionTypes with different TransactionStates.
  interfaceInteractions: CustomFields[];
  /**Interface interactions can be requests sent to the PSP, responses received from the PSP or notifications received from the PSP. Some interactions may result in a transaction. If so, the interactionId in the Transaction should be set to match the ID of the PSP for the interaction. Interactions are managed by the PSP integration and are usually neither written nor read by the user facing frontends or other services.*/
};

export type PaymentStatus = {
  interfaceCode: string;
  interfaceText: string;
};

export type PaymentMethodInfo = {
  paymentInterface: string;
  method: string;
  name: Scalars["LocalizedString"];
};
