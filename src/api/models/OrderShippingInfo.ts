/* tslint:disable */
/* eslint-disable */
/**
 * RC中国-爱宠有卡
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    OrderShippingInfoDeliverys,
} from './';

/**
 * 
 * @export
 * @interface OrderShippingInfo
 */
export interface OrderShippingInfo {
    shippingMethodName: string;
    deliveryTime: string;
    shippingCompany: string;
    trackingId: string;
    isReturn: string;
    status: string;
    deliverys: Array<OrderShippingInfoDeliverys>;
}

