import {Component, OnInit} from '@angular/core';
import {Device, DeviceControllerService, DeviceUpdateRequest} from "../../../../api";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import EnergyDistributionEventEnum = Device.EnergyDistributionEventEnum;

@Component({
  selector: 'app-update-energy-distribution-event',
  templateUrl: './update-energy-distribution-event.component.html',
  styleUrls: ['./update-energy-distribution-event.component.scss']
})
export class UpdateEnergyDistributionEventComponent implements OnInit {

  device: any;
  events: any[] = [];
  selectedEvent: any;
  managedStrength!: number;


  constructor(private config: DynamicDialogConfig,
              private deviceService: DeviceControllerService,
              private messageService: MessageService) {
    this.device = this.config.data.device
    this.selectedEvent = this.device.energyDistributionEvent;
  }

  ngOnInit(): void {
    this.deviceService.fetchEnergyDistributionEvents(this.device.deviceType).subscribe({
      next: (events) => {
        this.events = events;
        this.managedStrength = this.device.managedStrength;
      }
    });
  }

  update() {
    let req: DeviceUpdateRequest = {
      energyDistributionEvent: this.selectedEvent,
      deviceType: this.device.deviceType,
      priority: this.device.priority,
      name: this.device.name,
      managedStrength: this.managedStrength
    }

    this.deviceService.updateDevice(this.device.id, req).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Einstellung wurde gespeichert'});
    });
  }

  protected readonly Device = Device;
}
