import {Component, OnInit} from '@angular/core';
import {Device, DeviceControllerService, DeviceUpdateRequest} from "../../../api";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-energy-management',
  templateUrl: './energy-management.component.html',
  styleUrls: ['./energy-management.component.scss']
})
export class EnergyManagementComponent implements OnInit {
  devices: Device[] = [];

  constructor(private deviceService: DeviceControllerService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadDevices()
  }

  private loadDevices() {
    this.deviceService.fetchDevices().subscribe(devices => {
      this.devices = devices;
    });
  }

  onArrow(device: Device, up: boolean) {
    if (device.id != null && device.priority != null) {
      let req: DeviceUpdateRequest = {
        name: device.name,
        deviceType: device.deviceType,
        priority: up ? device.priority - 1 : device.priority + 1
      }

      this.deviceService.updateDevice(device.id, req).subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Gerät wurde verschoben'});
        this.loadDevices();
      });
    }
  }

  protected readonly Device = Device;
}
