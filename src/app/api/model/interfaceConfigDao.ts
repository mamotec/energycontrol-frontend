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


export interface InterfaceConfigDao { 
    protocolId?: number;
    protocolName?: string;
    /**
     * Die Schnittstellen Typen
     */
    type?: InterfaceConfigDao.TypeEnum;
    port?: string;
}
export namespace InterfaceConfigDao {
    export type TypeEnum = 'RS485' | 'TCP';
    export const TypeEnum = {
        Rs485: 'RS485' as TypeEnum,
        Tcp: 'TCP' as TypeEnum
    };
}


