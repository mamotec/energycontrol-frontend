import {Component, ViewChild} from '@angular/core';
import {DeviceControllerService} from "../../../api";
import {DeviceListComponent} from "../device/device-list/device-list.component";

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent {
  // @ts-ignore
  @ViewChild(DeviceListComponent) private deviceListComponent: DeviceListComponent;

  constructor(private deviceService: DeviceControllerService) {
  }

  startScan() {

  }

}
