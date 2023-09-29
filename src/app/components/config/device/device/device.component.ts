import {Component, OnInit, Type} from '@angular/core';
import {
  Device,
  DeviceControllerService,
  DeviceTypeResponse,
  InterfaceConfig,
  InterfaceControllerService
} from "../../../../api";
import {DialogService} from "primeng/dynamicdialog";
import {MenuItem} from "primeng/api";
import {CreateHybridInverterComponent} from "../create-device/create-hybrid-inverter/create-hybrid-inverter.component";
import {
  CreateChargingStationComponent
} from "../create-device/create-charging-station/create-charging-station.component";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  devices: Device[] = [];
  interfaceConfigs: InterfaceConfig[] = [];
  deviceTypes: DeviceTypeResponse[] = [];
  buttonItems: MenuItem[] = [];

  constructor(private dialogRef: DialogService,
              private interfaceConfigService: InterfaceControllerService,
              private deviceControllerService: DeviceControllerService) {
  }

  ngOnInit(): void {
    this.loadDevices();
    this.loadInterfaces();
    this.loadDeviceTypes()
  }

  loadInterfaces() {
    this.interfaceConfigService.fetchInterfaceConfigs().subscribe({
      next: (items) => {
        this.interfaceConfigs = items;
      }
    })
  }

  loadDevices() {
    this.deviceControllerService.fetchDevices().subscribe({
      next: (items) => {
        this.devices = items;
      }
    })
  }

  private loadDeviceTypes() {
    this.deviceControllerService.fetchDeviceTypes().subscribe({
      next: (res: DeviceTypeResponse[]) => {
        this.deviceTypes = res;
        for (const deviceType of this.deviceTypes) {
          this.buttonItems.push({
            label: deviceType.label,
            command: () => {
              this.createDevice(deviceType)
            }
          })
        }
      }
    })

  }

  createDevice(deviceType: DeviceTypeResponse) {
    const createDialog = this.dialogRef.open(this.getDialogByDeviceType(deviceType.deviceType!), {
      data: {
        interfaceConfigs: this.interfaceConfigs,
        deviceType
      },
      width: '100%',
      height: '100%',
      styleClass: 'card',
      maximizable: true,
      header: deviceType.label + ' definieren',
    })

    createDialog.onClose.subscribe(() => {
      this.loadDevices();
    })
  }

  private getDialogByDeviceType(deviceType: string): Type<any> {
    switch (deviceType) {
      case 'HYBRID_INVERTER':
        return CreateHybridInverterComponent;
      case 'CHARGING_STATION':
        return CreateChargingStationComponent;
      default:
        return CreateHybridInverterComponent;
    }
  }
}
