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
  selectedGroups: any[] = [];
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
        this.deviceGroups = res;
        this.selectedGroups = res.filter((group: PlantDeviceGroup) => group.feedInManagement);
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

  updateGroup(group: DeviceGroup) {
    let plantDeviceGroup: PlantDeviceGroup = group;
    let hasError = false;
    let feedInManagement = this.selectedGroups.find((group: DeviceGroup) => group.id == plantDeviceGroup.id) != null;

    let request: PlantDeviceGroupUpdate = {
      type: plantDeviceGroup.type,
      name: plantDeviceGroup.name,
      id: plantDeviceGroup.id,
      directMarketing: plantDeviceGroup.directMarketing,
      feedInManagement: feedInManagement
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
