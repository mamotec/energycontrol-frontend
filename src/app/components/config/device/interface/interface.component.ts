import {Component, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {CreateInterfaceConfigComponent} from "./create-interface/create-interface-config.component";
import {MessageService} from "primeng/api";
import {Device, DeviceControllerService, InterfaceConfig, InterfaceControllerService} from "../../../../api";
import {CreateDeviceComponent} from "../create-device/create-device.component";

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss'],
  providers: [DialogService]
})
export class InterfaceComponent implements OnInit {
  interfaceConfigs: InterfaceConfig[] = [];
  devices: Device[] = [];

  constructor(private dialogRef: DialogService,
              private messageService: MessageService,
              private interfaceConfigService: InterfaceControllerService,
              private deviceControllerService: DeviceControllerService) {
  }

  ngOnInit(): void {
    this.loadInterfaces();
    this.loadDevices();
  }

  // region Schnittstellen
  loadInterfaces() {
    this.interfaceConfigService.fetchInterfaceConfigs().subscribe({
      next: (items) => {
        this.interfaceConfigs = items;
      }
    })
  }

  createInterfaceConfig() {
    const createDialog = this.dialogRef.open(CreateInterfaceConfigComponent, {
      header: 'Schnittstelle definieren',
      width: '30%',
      height: '40%',
      maximizable: true
    })

    createDialog.onClose.subscribe(() => {
      this.loadInterfaces();
    })

  }

  onInterfaceRowDelete(interfaceToDelete: InterfaceConfig) {
    this.interfaceConfigService.deleteInterfaceConfig(interfaceToDelete.id as number).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Erfolgreich'});
        this.loadInterfaces();
      }
    });
  }

  // endregion

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
        if (d.interfaceConfig === interfaceConfig) {
          total++;
        }
      }
    }

    return total;
  }

  // endregion





}
