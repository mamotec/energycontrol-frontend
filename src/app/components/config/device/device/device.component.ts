import {Component, OnInit} from '@angular/core';
import {CreateDeviceComponent} from "../create-device/create-device.component";
import {Device, DeviceControllerService, InterfaceConfig, InterfaceControllerService} from "../../../../api";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  devices: Device[] = [];
  interfaceConfigs: InterfaceConfig[] = [];

  constructor(private dialogRef: DialogService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
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
      styleClass: 'card',
      maximizable: true,
      header: 'Gerät definieren',
    })

    createDialog.maximize(true)

    createDialog.onClose.subscribe(() => {
      this.loadDevices();
    })
  }

  // endregion


}
