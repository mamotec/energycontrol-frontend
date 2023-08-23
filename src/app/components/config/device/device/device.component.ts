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
  deleteDeviceDialogId: string = 'deleteDeviceDialog';

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
      header: 'Gerät definieren',
      width: '40%',
      height: '60%',
      maximizable: true
    })

    createDialog.onClose.subscribe(() => {
      this.loadDevices();
    })
  }

  deleteDevice(device: Device) {
    this.confirmationService.confirm({
      message: 'Wollen Sie das Gerät wirklich löschen? Beim Löschen werden alle bereits geloggten Daten gelöscht! Das Gerät wird aus der Aufzeichnung entfernt - Dieser Vorgang kann nicht rückgängig gemacht werden!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (device != null) {
          this.deviceControllerService.deleteDevice(device.id!).subscribe({
            next: () => {
              this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Geräte gelöscht', life: 3000});
              this.loadDevices();
            }
          })
        }
      }
    });
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
