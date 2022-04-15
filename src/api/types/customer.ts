export interface CustomerPagedQueryResponse {
  /**
   *
   */
  readonly limit: number
  /**
   *
   */
  readonly count: number
  /**
   *
   */
  readonly total?: number
  /**
   *
   */
  readonly offset: number
  /**
   *
   */
  readonly results: Customer[]
}


export interface Customer {
  /**
   *	The unique ID of the customer.
   *
   */
  readonly id: string
  /**
   *	The current version of the customer.
   *
   */
  readonly version: number
  /**
   *
   */
  readonly createdAt: string
  /**
   *
   */
  readonly lastModifiedAt: string
  /**
   *	Present on resources created after 1 February 2019 except for [events not tracked](/client-logging#events-tracked).
   *
   *
   */
  // readonly lastModifiedBy?: LastModifiedBy
  /**
   *	Present on resources created after 1 February 2019 except for [events not tracked](/client-logging#events-tracked).
   *
   *
   */
  // readonly createdBy?: CreatedBy
  /**
   *	The customer number can be used to create a more human-readable (in contrast to ID) identifier for the customer.
   *	It should be unique across a project.
   *	Once the field was set it cannot be changed anymore.
   *
   */
  readonly customerNumber?: string
  /**
   *	The customer's email address and the main identifier of uniqueness for a customer account.
   *	Email addresses are either unique to the store they're specified for, _or_ for the entire project.
   *	For more information, see Email uniquenes.
   *
   */
  readonly email: string
  /**
   *	Only present with the default `authenticationMode`, `Password`.
   *
   */
  readonly password?: string
  /**
   *
   */
  readonly firstName?: string
  /**
   *
   */
  readonly lastName?: string
  /**
   *
   */
  readonly middleName?: string
  /**
   *
   */
  readonly title?: string
  /**
   *
   */
  readonly dateOfBirth?: string
  /**
   *
   */
  readonly companyName?: string
  /**
   *
   */
  readonly vatId?: string
  /**
   *	The addresses have unique IDs in the addresses list
   *
   */
  // readonly addresses: Address[]
  /**
   *	The address ID in the addresses list
   *
   */
  readonly defaultShippingAddressId?: string
  /**
   *	The IDs from the addresses list which are used as shipping addresses
   *
   */
  readonly shippingAddressIds?: string[]
  /**
   *	The address ID in the addresses list
   *
   */
  readonly defaultBillingAddressId?: string
  /**
   *	The IDs from the addresses list which are used as billing addresses
   *
   */
  readonly billingAddressIds?: string[]
  /**
   *
   */
  readonly isEmailVerified: boolean
  /**
   *
   */
  readonly externalId?: string
  /**
   *
   */
  // readonly customerGroup?: CustomerGroupReference
  /**
   *
   */
  // readonly custom?: CustomFields
  /**
   *
   */
  readonly locale?: string
  /**
   *
   */
  readonly salutation?: string
  /**
   *	User-specific unique identifier for a customer.
   *	Must be unique across a project.
   *	The field can be reset using the Set Key UpdateAction
   *
   */
  readonly key?: string
  /**
   *	References to the stores the customer account is associated with.
   *	If no stores are specified, the customer is a global customer, and can log in using the Password Flow for global Customers.
   *	If one or more stores are specified, the customer can only log in using the Password Flow for Customers in a Store for those specific stores.
   *
   */
  // readonly stores?: StoreKeyReference[]
  /**
   *	Defines whether a Customer has a password.
   *
   */
  // readonly authenticationMode?: AuthenticationMode
}