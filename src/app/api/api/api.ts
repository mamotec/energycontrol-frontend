export * from './authenticationController.service';
import { AuthenticationControllerService } from './authenticationController.service';
export * from './deviceController.service';
import { DeviceControllerService } from './deviceController.service';
export * from './groupController.service';
import { GroupControllerService } from './groupController.service';
export * from './interfaceController.service';
import { InterfaceControllerService } from './interfaceController.service';
export const APIS = [AuthenticationControllerService, DeviceControllerService, GroupControllerService, InterfaceControllerService];
