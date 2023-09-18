import {Component, OnInit} from '@angular/core';
import {ConfigurationControllerService, DeviceGroup, DeviceGroupControllerService, PlantDeviceGroup, PlantDeviceGroupUpdate, SystemConfiguration} from "../../../../api";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-direct-marketing',
  templateUrl: './direct-marketing.component.html',
  styleUrls: ['./direct-marketing.component.scss']
})
export class DirectMarketingComponent implements OnInit {

  deviceGroups: DeviceGroup[] = [];
  selectedGroups: any[] = [];
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
        this.deviceGroups = res;
        this.selectedGroups = res.filter((group: PlantDeviceGroup) => group.directMarketing);
      }
    })
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

  updateGroup(group: DeviceGroup) {
    let plantDeviceGroup: PlantDeviceGroup = group;
    let hasError = false;
    let directMarketing = this.selectedGroups.find((group: DeviceGroup) => group.id == plantDeviceGroup.id) != null;

    let request: PlantDeviceGroupUpdate = {
      type: plantDeviceGroup.type,
      name: plantDeviceGroup.name,
      id: plantDeviceGroup.id,
      directMarketing: directMarketing,
      feedInManagement: plantDeviceGroup.feedInManagement
    }

    this.deviceGroupService.updateGroup(request).subscribe({
      error: () => {
        hasError = true;
      }
    });
    if (!hasError) {
      this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Die Gruppe wurde erfolgreich gespeichert.'});
    } else {
      this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Die Gruppe konnte nicht gespeichert werden.'});
    }
  }
}
