import {Component, OnInit} from '@angular/core';
import {
  ConfigurationControllerService,
  DeviceGroup,
  DeviceGroupControllerService,
  PlantDeviceGroup,
  PlantDeviceGroupCreate,
  PlantDeviceGroupUpdate,
  SystemConfiguration
} from "../../../../api";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-direct-marketing',
  templateUrl: './direct-marketing.component.html',
  styleUrls: ['./direct-marketing.component.scss']
})
export class DirectMarketingComponent implements OnInit {
  deviceGroups: DeviceGroup[] = [];
  directMarketingGroups: DeviceGroup[] = [];
  configuration: SystemConfiguration = {directMarketing: false}
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
        this.directMarketingGroups = res.filter((group: PlantDeviceGroup) => group.directMarketing);
        this.deviceGroups = res.filter((group: PlantDeviceGroup) => !group.directMarketing);
      }
    })
  }

  onMoveToTarget() {
    let hasError = false;
    this.directMarketingGroups.forEach((group: PlantDeviceGroup) => {
      let request: PlantDeviceGroupUpdate = {
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
      let request: PlantDeviceGroupUpdate = {
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
