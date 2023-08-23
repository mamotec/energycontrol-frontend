import {Component, OnInit} from '@angular/core';
import {CreateDeviceComponent} from "../create-device/create-device.component";
import {Device, DeviceControllerService, InterfaceConfig, InterfaceControllerService} from "../../../../api";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  providers: [DialogService]
})
export class DeviceComponent implements OnInit {
  devices: Device[] = [];
  interfaceConfigs: InterfaceConfig[] = [];

  constructor(private dialogRef: DialogService,
              private interfaceConfigService: InterfaceControllerService,
              private deviceControllerService: DeviceControllerService) {
  }

  ngOnInit(): void {
    this.loadDevices();
    this.loadInterfaces();

  }

  loadInterfaces() {
    this.interfaceConfigService.fetchInterfaceConfigs().subscribe({
      next: (items) => {
        this.interfaceConfigs = items;
      }
    })
  }

  // region Geräte

  loadDevices() {
    this.deviceControllerService.fetchDevices().subscribe({
      next: (items) => {
        this.devices = items;
      }
    })
  }

  createDevice() {
    const createDialog = this.dialogRef.open(CreateDeviceComponent, {
      data: {
        interfaceConfigs: this.interfaceConfigs
      },
      header: 'Gerät definieren',
      width: '40%',
      height: '60%',
      maximizable: true
    })

    createDialog.onClose.subscribe(() => {
      this.loadDevices();
    })

  }

  calculateDeviceTotal(interfaceConfig: InterfaceConfig) {
    let total = 0;

    if (this.devices) {
      for (let d of this.devices) {
        if (d.interfaceConfig?.id === interfaceConfig.id) {
          total++;
        }
      }
    }

    return total;
  }

  // endregion


}
