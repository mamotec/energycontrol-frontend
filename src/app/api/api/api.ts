export * from './authenticationController.service';
import { AuthenticationControllerService } from './authenticationController.service';
export * from './deviceController.service';
import { DeviceControllerService } from './deviceController.service';
export * from './testController.service';
import { TestControllerService } from './testController.service';
export const APIS = [AuthenticationControllerService, DeviceControllerService, TestControllerService];
