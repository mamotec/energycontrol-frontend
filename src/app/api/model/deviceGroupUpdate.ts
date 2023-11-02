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
import { FetchDevice200Response } from './fetchDevice200Response';


export interface DeviceGroupUpdate { 
    name?: string;
    devices?: Array<FetchDevice200Response>;
    type?: DeviceGroupUpdate.TypeEnum;
    id?: number;
}
export namespace DeviceGroupUpdate {
    export type TypeEnum = 'PLANT' | 'CHARGING_STATION' | 'HEAT_PUMP' | 'BATTERY' | 'HOME';
    export const TypeEnum = {
        Plant: 'PLANT' as TypeEnum,
        ChargingStation: 'CHARGING_STATION' as TypeEnum,
        HeatPump: 'HEAT_PUMP' as TypeEnum,
        Battery: 'BATTERY' as TypeEnum,
        Home: 'HOME' as TypeEnum
    };
}


