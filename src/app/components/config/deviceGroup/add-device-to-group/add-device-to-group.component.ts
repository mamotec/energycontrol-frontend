import {Component, OnInit} from '@angular/core';
import {
  Device,
  DeviceControllerService,
  DeviceGroup,
  DeviceGroupControllerService,
  DeviceLinkRequest
} from "../../../../api";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-device-to-group',
  templateUrl: './add-device-to-group.component.html',
  styleUrls: ['./add-device-to-group.component.scss']
})
export class AddDeviceToGroupComponent implements OnInit {

  deviceGroup: DeviceGroup = this.config.data.deviceGroup;
  validDevices: Device[] = [];
  selectedDevices: Device[] = [];

  constructor(private deviceService: DeviceControllerService,
              private messageService: MessageService,
              private deviceGroupService: DeviceGroupControllerService,
              public ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
  ) {
    this.deviceGroup = this.config.data.deviceGroup;
  }

  ngOnInit(): void {
    this.loadValidDevicesForGroup();
  }

  loadValidDevicesForGroup() {
    // @ts-ignore
    this.deviceService.fetchDevicesForGroup(this.deviceGroup.id).subscribe({
      next: (res) => {
        this.validDevices = res;
      }
    });

    this.validDevices
      .forEach((device) => {
        if (device.groupId != null)
          this.selectedDevices.push(device)
      })

    this.validDevices = this.validDevices.filter((device) => device.groupId != null)

    console.log(this.validDevices)
    console.log(this.selectedDevices)
  }

  addDevicesToGroup() {
    let req: DeviceLinkRequest = {
      deviceIds: []
    };

    this.selectedDevices.forEach((device) => {
      // @ts-ignore
      req.deviceIds.push(device.id);
    });

    // @ts-ignore
    this.deviceGroupService.addDeviceToGroup(this.deviceGroup.id, req).subscribe({
      next: () => {
        this.ref.close();
        this.messageService.add({severity: 'success', summary: 'Erfolgreich'});
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: err.error});
      }
    });

  }
}
