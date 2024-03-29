import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DeviceGroupControllerService, PlantDeviceGroup} from "../../../api";
import {LocalStorageService} from "../../../service/local-storage.service";

@Component({
  selector: 'app-plant-group-dashboard',
  templateUrl: './plant-group-dashboard.component.html',
  styleUrls: ['./plant-group-dashboard.component.scss']
})
export class PlantGroupDashboardComponent implements OnInit {

  @ViewChild('group', {read: ViewContainerRef})
  groupContainer!: ViewContainerRef;

  deviceGroups: any[] = [];

  constructor(private deviceGroupService: DeviceGroupControllerService) {
  }

  ngOnInit() {
    this.loadDeviceGroups().then(() => {
      this.creatComponentsBasedOnDeviceGroups()
    });
  }

  loadDeviceGroups() {
    return new Promise((resolve, reject) => {
      this.deviceGroupService.getAllGroups().subscribe((data) => {
        this.deviceGroups = data;
        // @ts-ignore
        resolve();
      });
    });
  }

  private creatComponentsBasedOnDeviceGroups() {
    this.deviceGroups.forEach((deviceGroup) => {
      if (deviceGroup.type === PlantDeviceGroup.TypeEnum.Plant) {
        this.createPlantComponent(deviceGroup);
      }
    });

  }

  private createPlantComponent(deviceGroup: any) {
    this.groupContainer.createComponent(PlantGroupDashboardComponent);
  }

}
