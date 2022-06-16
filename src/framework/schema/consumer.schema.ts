import {
  CustomFields,
  Scalars,
  CreatedBy,
  LastModifiedBy,
} from "./common.schema";
import { Store } from "./cart.schema";

export type Address = {
  country: string;
  /**A two:digit country code as perISO 3166:1 alpha:2.*/
  id: string;
  key: string;
  /**User-defined identifier for the address. If given, it must follow the pattern [a:zA:Z0:9_\:]{2,256}.*/
  title: string;
  salutation: string;
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  additionalStreetInfo: string;
  postalCode: string;
  city: string;
  region: string;
  state: string;
  company: string;
  department: string;
  building: string;
  apartment: string;
  pOBox: string;
  phone: string;
  mobile: string;
  email: string;
  fax: string;
  additionalAddressInfo: string;
  externalId: string;
  custom: CustomFields;
};

export type Consumer = {
  id: string;
  /**The unique ID of the consumer.*/
  consumerNumber: string;
  /**The consumer number can be used to create a more human-readable (in contrast to ID) identifier for the consumer. It should be unique across a project. Once the field was set it cannot be changed anymore.*/
  key: string;
  /**User-specific unique identifier for a consumer. Must be unique across a project. The field can be reset using the Set Key UpdateAction*/
  version: number;
  /**The current version of the consumer.*/
  createdAt: Scalars["DateTime"];
  createdBy: CreatedBy;
  /** Present on resources created after 2019-02-01 except for events not tracked.*/
  lastModifiedAt: Scalars["DateTime"];
  lastModifiedBy: LastModifiedBy;
  /**Present on resources updated after 2019-02-01 except for events not tracked.*/
  email: string;
  /**The consumer's email address and the main identifier of uniqueness for a consumer account. Email addresses are either unique to the store they're specified for, or for the entire project. For more information, see Email uniqueness.*/
  password: string;
  /**when authenticationMode is set to ExternalAuth.*/
  stores: Store;
  /** References to the stores the consumer account is associated with. If no stores are specified, the consumer is a global consumer, and can log in using the Password Flow for global Consumers. If one or more stores are specified, the consumer can only log in using the Password Flow for Consumers in a Store for those specific stores.*/
  firstName: string;
  lastName: string;
  middleName: string;
  title: string;
  salutation: string;
  dateOfBirth: Date;
  companyName: string;
  vatId: string;
  addresses: Address[];
  /**The addresses have unique IDs in the addresses list*/
  defaultShippingAddressId: string;
  /**The address ID in the addresses list*/
  shippingAddressIds: [];
  /**The IDs from the addresses list which are used as shipping addresses*/
  defaultBillingAddressId: string;
  /**The address ID in the addresses list*/
  billingAddressIds: [];
  /**The IDs from the addresses list which are used as billing addresses*/
  isEmailVerified: Boolean;
  externalId: string;
  // consumerGroup : ConsumerGroup
  custom: CustomFields;
  locale: string;
  /**String conforming to IETF language tag*/
  // authenticationMode : AuthenticationMode
  /**Indicates whether the password is required for the Consumer.*/
};
