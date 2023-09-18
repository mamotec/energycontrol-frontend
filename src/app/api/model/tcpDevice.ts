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


export interface TcpDevice { 
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    interfaceConfig?: InterfaceConfig;
    deviceType?: TcpDevice.DeviceTypeEnum;
    active: boolean;
    groupId?: number;
    model?: string;
    manufacturerId?: number;
    deviceId?: number;
    deleted?: boolean;
    unitId?: number;
    /**
     * Die Schnittstellen Typen
     */
    interfaceType?: TcpDevice.InterfaceTypeEnum;
    host?: string;
    port?: string;
}
export namespace TcpDevice {
    export type DeviceTypeEnum = 'INVERTER' | 'HYBRID_INVERTER' | 'BATTERY';
    export const DeviceTypeEnum = {
        Inverter: 'INVERTER' as DeviceTypeEnum,
        HybridInverter: 'HYBRID_INVERTER' as DeviceTypeEnum,
        Battery: 'BATTERY' as DeviceTypeEnum
    };
    export type InterfaceTypeEnum = 'RS485' | 'TCP';
    export const InterfaceTypeEnum = {
        Rs485: 'RS485' as InterfaceTypeEnum,
        Tcp: 'TCP' as InterfaceTypeEnum
    };
}


