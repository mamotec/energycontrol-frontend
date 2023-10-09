import {Component, HostListener, OnInit} from '@angular/core';
import {Device, DeviceControllerService, DeviceUpdateRequest} from "../../../api";
import {MenuItem, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {UpdateEnergyDistributionEventComponent} from "./update-energy-distribution-event/update-energy-distribution-event.component";

@Component({
  selector: 'app-energy-management',
  templateUrl: './energy-management.component.html',
  styleUrls: ['./energy-management.component.scss']
})
export class EnergyManagementComponent implements OnInit {

  devices: Device[] = [];
  items: MenuItem[] = [];
  isScreenLarge!: boolean;

  constructor(private deviceService: DeviceControllerService,
              private dialogRef: DialogService,
              private messageService: MessageService) {
    this.onResize();
  }

  async ngOnInit() {
    this.loadDevices()
  }

  private loadDevices() {
    this.deviceService.fetchDevices().subscribe(async (devices) => {
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

  @HostListener('window:resize')
  onResize() {
    this.isScreenLarge = window.innerWidth > 650;
  }

  protected readonly Device = Device;

  updateEnergyDistributionEvent(device: any) {
    const updateDialog = this.dialogRef.open(UpdateEnergyDistributionEventComponent, {
      data: {
        device
      },
      header: "Energieverteilung anpassen"
    })

    updateDialog.onClose.subscribe(() => {
      this.loadDevices();
    })
  }
}
