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


export interface Group { 
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
    /**
     * Die Gruppen Typen
     */
    type?: Group.TypeEnum;
}
export namespace Group {
    export type TypeEnum = 'PV_PLANT';
    export const TypeEnum = {
        PvPlant: 'PV_PLANT' as TypeEnum
    };
}


