import {
  Scalars,
  CreatedBy,
  LastModifiedBy,
  CentPrecisionMoney,
  CustomLineItem,
  CustomFields,
} from "./common.schema";
import { Store, LineItem, Cart } from "./cart.schema";
import { Address } from "./customer.schema";
import {
  TaxMode,
  OrderState,
  ShipmentState,
  PaymentState,
  InventoryMode,
  CartOrigin,
} from "../enum";

export type Order = {
  id: string;
  /** The unique ID of the order.*/
  version: number;
  /**The current version of the order.*/
  createdAt: Scalars["DateTime"];
  createdBy: CreatedBy;
  /**Present on resources created after 2019-02-01 except for events not tracked.*/
  lastModifiedAt: Scalars["DateTime"];
  lastModifiedBy: LastModifiedBy;
  /**Present on resources updated after 2019-02-01 except for events not tracked.*/
  completedAt: Scalars["DateTime"];
  /**This field will only be present if it was set for Order Import*/
  orderNumber: string;
  /** String that uniquely identifies an order. It can be used to create more human-readable (in contrast to ID) identifier for the order. It should be unique across a project. Once it's set it cannot be changed.*/
  customerId: string;
  customerEmail: string;
  anonymousId: string;
  /** Identifies carts and orders belonging to an anonymous session (the customer has not signed up/in yet).*/
  store: Store;
  lineItems: LineItem[];
  customLineItems: CustomLineItem[];
  totalPrice: CentPrecisionMoney;
  /**The total price of this line item. If the line item is discounted, then the totalPrice is the DiscountedLineItemPriceForQuantity multiplied by quantity. Otherwise the total price is the product price multiplied by the quantity. totalPrice may or may not include the taxes: it depends on the taxRate.includedInPrice property.*/
  // taxedPrice :TaxedPrice
  /** The taxes are calculated based on the shipping address.*/
  shippingAddress: Address;
  billingAddress: Address;
  taxMode: TaxMode;
  // taxRoundingMode :RoundingMode
  /**When calculating taxes for taxedPrice, the selected mode is used for rouding.*/
  // taxCalculationMode :TaxCalculationMode
  /**When calculating taxes for taxedPrice, the selected mode is used for calculating the price with LineItemLevel (horizontally) or UnitPriceLevel (vertically) calculation mode.*/
  // customerGroup :CustomerGroup
  /**Set when the customer is set and the customer is a member of a customer group. Used for product variant price selection.*/
  country: string;
  /**A two-digit country code as perISO 3166-1 alpha-2. Used for product variant price selection.*/
  orderState: OrderState;
  /**One of the four predefined OrderStates.*/
  state: State;
  /**This reference can point to a state in a custom workflow.*/
  shipmentState: ShipmentState;
  paymentState: PaymentState;
  // shippingInfo:ShippingInfo
  /** Set if the ShippingMethod is set.*/
  // syncInfo - Set of SyncInfo
  // returnInfo : ReturnInfo[]
  // discountCodes : DiscountCodeInfo[]
  // refusedGifts : CartDiscounts[]
  /**Automatically filled when a line item with LineItemMode GiftLineItem is removed from this order.*/
  lastMessageSequenceNumber: number;
  /**The sequence number of the last order message produced by changes to this order. 0 means, that no messages were created yet.*/
  cart: Cart;
  /**Set when this order was created from a cart. The cart will have the state Ordered.*/
  custom: CustomFields;
  // paymentInfo :PaymentInfo
  locale: string;
  /**conforming to IETF language tag- Optional*/
  inventoryMode: InventoryMode;
  // shippingRateInput :ShippingRateInput
  /**The shippingRateInput is used as an input to select a ShippingRatePriceTier.*/
  origin: CartOrigin;
  itemShippingAddresses: Address[];
  /**Contains addresses for orders with multiple shipping addresses.*/
};

export type State = {
  id: string;
  /**Unique ID of the State.*/
  // version: Int;
  /**Current version of the State.*/
  key: string;
  /** User-defined unique identifier for the State.*/
  createdAt: Scalars["DateTime"];
  /**Date and time (UTC) the State was initially created.*/
  createdBy: CreatedBy;
  /**Present on resources created after 1 February 2019 except for events not tracked.*/
  lastModifiedAt: Scalars["DateTime"];
  /** Date and time (UTC) the State was last updated.*/
  lastModifiedBy: LastModifiedBy;
  /**Present on resources created after 1 February 2019 except for events not tracked.*/
  // type: StateTypeEnum;
  /**Indicates to which resource or object types the State is assigned to.*/
  name: Scalars["LocalizedString"];
  /**Name of the State.*/
  description: Scalars["LocalizedString"];
  /**Description of the State.*/
  initial: boolean;
  /**true for an initial State, the first State in a workflow.*/
  builtIn: boolean;
  /**true for States that are an integral part of the Project. Those States cannot be deleted and their key cannot be changed.*/
  // roles: StateRoleEnum[];
  /**Roles the State can fulfill for Reviews and Line Items.*/
  // transitions: StateReference[];
  /**list of States of the same type that the current State can be transitioned to. For example, when the current State is the Initial State of StateType OrderState and this list contains the reference to the Shipped OrderState, the transition Initial -> Shipped is allowed.
   if empty, no transitions are allowed from the current State, defining the current State as final for this workflow.
   if not set, the validation is turned off and the current State can be transitioned to any other State of the same type as the current State.*/
};
