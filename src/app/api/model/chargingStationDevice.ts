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


export interface ChargingStationDevice { 
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    interfaceConfig?: InterfaceConfig;
    deviceType?: ChargingStationDevice.DeviceTypeEnum;
    active: boolean;
    groupId?: number;
    model?: string;
    manufacturerId?: number;
    deviceId?: number;
    deleted?: boolean;
    unitId?: number;
    host?: string;
    port?: string;
    deviceIdCharger?: number;
}
export namespace ChargingStationDevice {
    export type DeviceTypeEnum = 'INVERTER' | 'HYBRID_INVERTER' | 'CHARGING_STATION' | 'HEAT_PUMP' | 'BATTERY';
    export const DeviceTypeEnum = {
        Inverter: 'INVERTER' as DeviceTypeEnum,
        HybridInverter: 'HYBRID_INVERTER' as DeviceTypeEnum,
        ChargingStation: 'CHARGING_STATION' as DeviceTypeEnum,
        HeatPump: 'HEAT_PUMP' as DeviceTypeEnum,
        Battery: 'BATTERY' as DeviceTypeEnum
    };
}


