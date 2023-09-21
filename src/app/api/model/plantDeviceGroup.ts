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
import { FetchDevices200ResponseInner } from './fetchDevices200ResponseInner';


export interface PlantDeviceGroup { 
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    devices?: Array<FetchDevices200ResponseInner>;
    /**
     * Die Gruppen Typen
     */
    type?: PlantDeviceGroup.TypeEnum;
    directMarketing?: boolean;
    feedInManagement?: boolean;
    peakKilowatt?: number;
}
export namespace PlantDeviceGroup {
    export type TypeEnum = 'PLANT';
    export const TypeEnum = {
        Plant: 'PLANT' as TypeEnum
    };
}


