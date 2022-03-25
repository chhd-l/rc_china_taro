import { CreatedBy, LastModifiedBy, Scalars } from "../schema/common.schema";
import { Store } from "../schema/cart.schema";

export type Address = {
  country: string;
  id: string;
  salutation?: string;
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  region: string;
  state: string;
  phone: string;
  email: string;
};

export type Customer = {
  id: string;
  customerNumber: string;
  createdAt: Scalars["DateTime"];
  createdBy: CreatedBy;
  lastModifiedAt: Scalars["DateTime"];
  lastModifiedBy: LastModifiedBy;
  email: string;
  password: string;
  stores: Store;
  firstName: string;
  lastName: string;
  middleName: string;
  title?: string;
  salutation?: string;
  dateOfBirth: Date;
  companyName?: string;
  addresses: Address[];
  defaultShippingAddressId: string;
  shippingAddressIds: [];
  defaultBillingAddressId: string;
  billingAddressIds: [];
  isEmailVerified: Boolean;
  // authenticationMode : AuthenticationMode
  /**Indicates whether the password is required for the Customer.*/
};
