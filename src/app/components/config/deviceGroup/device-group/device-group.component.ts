import {Component, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {Device, DeviceGroup, DeviceGroupControllerService, DeviceLinkRequest} from "../../../../api";
import {CreateDeviceGroupComponent} from "../create-device-group/create-device-group.component";
import {AddDeviceToGroupComponent} from "../add-device-to-group/add-device-to-group.component";

@Component({
  selector: 'app-device-group',
  templateUrl: './device-group.component.html',
  styleUrls: ['./device-group.component.scss']
})
export class DeviceGroupComponent implements OnInit {
  deviceGroups: DeviceGroup[] = [];

  constructor(private deviceGroupService: DeviceGroupControllerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.loadDeviceGroups();
  }

  loadDeviceGroups() {
    this.deviceGroupService.getAllGroups().subscribe({
      next: (res) => {
        this.deviceGroups = res;
      }
    })
  }

  createDeviceGroup() {
    const createDialog = this.dialogService.open(CreateDeviceGroupComponent, {
      header: 'Gerätegruppe erstellen',
      width: '40%',
      height: '60vh',
      maximizable: true
    });

    createDialog.onClose.subscribe(() => {
      this.loadDeviceGroups();
    });

  }

  deleteGroup(group: DeviceGroup) {
    this.confirmationService.confirm({
      message: 'Wollen Sie die Gruppe wirklich löschen?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (group != null) {
          this.deviceGroupService.deleteGroup(group.id!).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Erfolgreich',
                detail: 'Gruppe gelöscht',
                life: 3000
              });
              this.loadDeviceGroups();
            }
          })
        }
      }
    });
  }

  getCountOfDevices(group: DeviceGroup): string {
    if (group.devices == null) {
      return "0";
    } else {
      return group.devices.length.toString();
    }
  }

  protected readonly console = console;

}
