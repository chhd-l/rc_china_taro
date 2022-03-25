import {
  Scalars,
  CreatedBy,
  LastModifiedBy,
  CentPrecisionMoney,
  CustomFields,
} from "./common.schema";
import { Customer } from "./customer.schema";
import {State} from "./order.schema"

export type Payment = {
  id: string;
  key: string;
  /** User-specific unique identifier for the payment (max. 256 characters).*/
  version: number;
  createdAt: Scalars["DateTime"];
  createdBy: CreatedBy;
  /**Present on resources created after 2019-02-01 except for events not tracked.*/
  lastModifiedAt: Scalars["DateTime"];
  lastModifiedBy: LastModifiedBy;
  /**Present on resources updated after 2019-02-01 except for events not tracked.*/
  customer: Customer;
  /**A reference to the customer this payment belongs to.*/
  anonymousId: string;
  /**Identifies payments belonging to an anonymous session (the customer has not signed up/in yet).*/
  interfaceId: string;
  /** The identifier that is used by the interface that manages the payment (usually the PSP). Cannot be changed once it has been set. The combination of this ID and the PaymentMethodInfo paymentInterface must be unique.*/
  amountPlanned: CentPrecisionMoney;
  /**How much money this payment intends to receive from the customer. The value usually matches the cart or order gross total.*/
  paymentMethodInfo: PaymentMethodInfo;
  paymentStatus: PaymentStatus;
  // transactions: Transaction[];
  /**A list of financial transactions of different TransactionTypes with different TransactionStates.*/
  interfaceInteractions: CustomFields[];
  /**Interface interactions can be requests sent to the PSP, responses received from the PSP or notifications received from the PSP. Some interactions may result in a transaction. If so, the interactionId in the Transaction should be set to match the ID of the PSP for the interaction. Interactions are managed by the PSP integration and are usually neither written nor read by the user facing frontends or other services.*/
  custom: CustomFields;
};

export type PaymentStatus = {
  interfaceCode: string;
  /**A code describing the current status returned by the interface that processes the payment.*/
  interfaceText: string;
  /**A text describing the current status returned by the interface that processes the payment.*/
  state: State;
};

export type PaymentMethodInfo = {
  paymentInterface: string;
  /**The interface that handles the payment (usually a PSP). Cannot be changed once it has been set. The combination of PaymentinterfaceId and this field must be unique.*/
  method: string;
  /**The payment method that is used, for example for example a conventional string representing Credit Card, Cash Advance etc.*/
  name: Scalars["LocalizedString"];
  /** A human-readable, localized name for the payment method, for example 'Credit Card'.*/
};
