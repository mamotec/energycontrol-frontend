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
import { EnergyDistributionResponse } from './energyDistributionResponse';
import { InterfaceConfig } from './interfaceConfig';


export interface HybridInverterDevice { 
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    interfaceConfig?: InterfaceConfig;
    active: boolean;
    manufacturerId?: number;
    deviceId?: number;
    deleted?: boolean;
    unitId?: number;
    host?: string;
    port?: string;
    priority?: number;
    energyDistributionEvent?: HybridInverterDevice.EnergyDistributionEventEnum;
    groupId?: number;
    model?: string;
    eventName?: string;
    eventDescription?: string;
    validEnergyDistributionEvents?: Array<EnergyDistributionResponse>;
    deviceType?: HybridInverterDevice.DeviceTypeEnum;
}
export namespace HybridInverterDevice {
    export type EnergyDistributionEventEnum = 'RENEWABLE_ENERGY' | 'UNMANAGED';
    export const EnergyDistributionEventEnum = {
        RenewableEnergy: 'RENEWABLE_ENERGY' as EnergyDistributionEventEnum,
        Unmanaged: 'UNMANAGED' as EnergyDistributionEventEnum
    };
    export type DeviceTypeEnum = 'INVERTER' | 'HYBRID_INVERTER' | 'CHARGING_STATION' | 'HEAT_PUMP' | 'BATTERY';
    export const DeviceTypeEnum = {
        Inverter: 'INVERTER' as DeviceTypeEnum,
        HybridInverter: 'HYBRID_INVERTER' as DeviceTypeEnum,
        ChargingStation: 'CHARGING_STATION' as DeviceTypeEnum,
        HeatPump: 'HEAT_PUMP' as DeviceTypeEnum,
        Battery: 'BATTERY' as DeviceTypeEnum
    };
}


