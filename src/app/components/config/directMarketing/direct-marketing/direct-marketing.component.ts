import {Component, OnInit} from '@angular/core';
import {DeviceGroup, DeviceGroupControllerService, PlantDeviceGroup, PlantDeviceGroupCreate} from "../../../../api";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-direct-marketing',
  templateUrl: './direct-marketing.component.html',
  styleUrls: ['./direct-marketing.component.scss']
})
export class DirectMarketingComponent implements OnInit {
  deviceGroups: DeviceGroup[] = [];
  directMarketingGroups: DeviceGroup[] = [];

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
        this.directMarketingGroups = res.filter((group: PlantDeviceGroup) => group.directMarketing);
        this.deviceGroups = res.filter((group: PlantDeviceGroup) => !group.directMarketing);
      }
    })
  }

  onMoveToTarget() {
    let hasError = false;
    this.directMarketingGroups.forEach((group: PlantDeviceGroup) => {
      let request: PlantDeviceGroupCreate = {
        type: group.type,
        name: group.name,
        id: group.id,
        directMarketing: true
      }

      this.deviceGroupService.updateGroup(request).subscribe({
        error: () => {
          hasError = true;
        }
      })

    });
    if (!hasError) {
      this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Die Gruppe(n) wurde erfolgreich zur Direktvermarktung hinzugefügt.'});
    } else {
      this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Die Gruppe(n) konnte nicht zur Direktvermarktung hinzugefügt werden.'});
    }
  }

  onMoveToSource() {
    let hasError = false;
    this.deviceGroups.forEach((group: PlantDeviceGroup) => {
      let request: PlantDeviceGroupCreate = {
        type: group.type,
        name: group.name,
        id: group.id,
        directMarketing: false
      }

      this.deviceGroupService.updateGroup(request).subscribe({
        error: () => {
          hasError = true;
        }
      });
    });
    if (!hasError) {
      this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Die Gruppe(n) wurde erfolgreich aus der Direktvermarktung entfernt.'});
    } else {
      this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Die Gruppe(n) konnte nicht aus der Direktvermarktung entfernt werden.'});
    }
  }

}
