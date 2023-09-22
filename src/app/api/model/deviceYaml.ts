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
import { InterfaceConnectionYaml } from './interfaceConnectionYaml';
import { InterfaceMappingYaml } from './interfaceMappingYaml';


export interface DeviceYaml { 
    deviceId?: number;
    deviceType?: DeviceYaml.DeviceTypeEnum;
    name?: string;
    connection?: InterfaceConnectionYaml;
    mapping?: InterfaceMappingYaml;
}
export namespace DeviceYaml {
    export type DeviceTypeEnum = 'INVERTER' | 'HYBRID_INVERTER' | 'CHARGING_STATION' | 'HEAT_PUMP' | 'BATTERY';
    export const DeviceTypeEnum = {
        Inverter: 'INVERTER' as DeviceTypeEnum,
        HybridInverter: 'HYBRID_INVERTER' as DeviceTypeEnum,
        ChargingStation: 'CHARGING_STATION' as DeviceTypeEnum,
        HeatPump: 'HEAT_PUMP' as DeviceTypeEnum,
        Battery: 'BATTERY' as DeviceTypeEnum
    };
}


