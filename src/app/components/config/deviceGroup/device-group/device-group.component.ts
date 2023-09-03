import {Component, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {DeviceGroup, DeviceGroupControllerService} from "../../../../api";
import {CreateDeviceGroupComponent} from "../create-device-group/create-device-group.component";
import {Group} from "../../../../api/model/group";

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
      height: '60%',
      maximizable: true
    });

    createDialog.onClose.subscribe(() => {
      this.loadDeviceGroups();
    });

  }

  addDeviceToGroup(group: DeviceGroup) {

  }


  deleteGroup(group: DeviceGroup) {
    this.confirmationService.confirm({
      message: 'Wollen Sie die Gruppe wirklich löschen?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (group != null) {
          this.deviceGroupService.deleteGroup(group.id!).subscribe({
            next: () => {
              this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Gruppe gelöscht', life: 3000});
              this.loadDeviceGroups();
            }
          })
        }
      }
    });
  }
}
