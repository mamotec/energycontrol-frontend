/**
 * Energy Control API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { InterfaceConfig } from './interfaceConfig';
import { Device } from './device';
import { HybridInverterDevice } from './hybridInverterDevice';
import { ChargingStationDevice } from './chargingStationDevice';


/**
 * @type FetchDevices200ResponseInner
 * @export
 */
export type FetchDevices200ResponseInner = ChargingStationDevice | Device | HybridInverterDevice;

