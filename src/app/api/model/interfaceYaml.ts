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
import { MetaDataYaml } from './metaDataYaml';
import { DeviceYaml } from './deviceYaml';
import { InterfaceMappingYaml } from './interfaceMappingYaml';


export interface InterfaceYaml { 
    metaData?: MetaDataYaml;
    devices?: Array<DeviceYaml>;
    connection?: InterfaceConnectionYaml;
    mapping?: InterfaceMappingYaml;
}

