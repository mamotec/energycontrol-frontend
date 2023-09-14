import {Component, OnInit} from '@angular/core';
import {ConfigurationControllerService, DeviceGroup, DeviceGroupControllerService, PlantDeviceGroup, PlantDeviceGroupUpdate, SystemConfiguration} from "../../../../api";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-feed-in-management',
  templateUrl: './feed-in-management.component.html',
  styleUrls: ['./feed-in-management.component.scss']
})
export class FeedInManagementComponent implements OnInit {
  deviceGroups: DeviceGroup[] = [];
  feedInManagementGroups: DeviceGroup[] = [];
  configuration: SystemConfiguration = {feedInManagement: false}
  stateOptions: any[] = [{label: 'Aus', value: false}, {label: 'An', value: true}];

  constructor(private deviceGroupService: DeviceGroupControllerService,
              private configurationService: ConfigurationControllerService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadDeviceGroups();
    this.loadConfiguration();
  }

  loadDeviceGroups() {
    this.deviceGroupService.getAllGroups().subscribe({
      next: (res) => {
        this.feedInManagementGroups = res.filter((group: PlantDeviceGroup) => group.feedInManagement);
        this.deviceGroups = res.filter((group: PlantDeviceGroup) => !group.feedInManagement);
      }
    })
  }

  onMoveToTarget() {
    let hasError = false;
    this.feedInManagementGroups.forEach((group: PlantDeviceGroup) => {
      let request: PlantDeviceGroupUpdate = {
        type: group.type,
        name: group.name,
        id: group.id,
        feedInManagement: true
      }

      this.deviceGroupService.updateGroup(request).subscribe({
        error: () => {
          hasError = true;
        }
      })

    });
    if (!hasError) {
      this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Die Gruppe(n) wurde erfolgreich zur Einspeisung hinzugefügt.'});
    } else {
      this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Die Gruppe(n) konnte nicht zur Einspeisung hinzugefügt werden.'});
    }
  }

  onMoveToSource() {
    let hasError = false;
    this.deviceGroups.forEach((group: PlantDeviceGroup) => {
      let request: PlantDeviceGroupUpdate = {
        type: group.type,
        name: group.name,
        id: group.id,
        feedInManagement: false
      }

      this.deviceGroupService.updateGroup(request).subscribe({
        error: () => {
          hasError = true;
        }
      });
    });
    if (!hasError) {
      this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Die Gruppe(n) wurde erfolgreich aus der Einspeisung entfernt.'});
    } else {
      this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Die Gruppe(n) konnte nicht aus der Einspeisung entfernt werden.'});
    }
  }

  private loadConfiguration() {
    this.configurationService.getConfiguration().subscribe({
      next: (res) => {
        this.configuration = res;
      }
    })
  }

  saveConfiguration() {
    this.configurationService.updateConfiguration(this.configuration).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Konfiguration gespeichert'});
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: err.error});
      }
    })
  }
}
