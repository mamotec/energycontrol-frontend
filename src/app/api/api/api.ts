export * from './authenticationController.service';
import { AuthenticationControllerService } from './authenticationController.service';
export * from './deviceController.service';
import { DeviceControllerService } from './deviceController.service';
export * from './deviceGroupController.service';
import { DeviceGroupControllerService } from './deviceGroupController.service';
export * from './interfaceController.service';
import { InterfaceControllerService } from './interfaceController.service';
export const APIS = [AuthenticationControllerService, DeviceControllerService, DeviceGroupControllerService, InterfaceControllerService];
