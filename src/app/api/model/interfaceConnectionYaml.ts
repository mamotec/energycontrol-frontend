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


export interface InterfaceConnectionYaml { 
    baudRate?: number;
    parity?: InterfaceConnectionYaml.ParityEnum;
    dataBits?: number;
    stopBits?: number;
}
export namespace InterfaceConnectionYaml {
    export type ParityEnum = 'EVEN';
    export const ParityEnum = {
        Even: 'EVEN' as ParityEnum
    };
}


