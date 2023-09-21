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


export interface AuthenticationResponse { 
    token?: string;
    applicationMode?: AuthenticationResponse.ApplicationModeEnum;
}
export namespace AuthenticationResponse {
    export type ApplicationModeEnum = 'HOME' | 'PLANT';
    export const ApplicationModeEnum = {
        Home: 'HOME' as ApplicationModeEnum,
        Plant: 'PLANT' as ApplicationModeEnum
    };
}


