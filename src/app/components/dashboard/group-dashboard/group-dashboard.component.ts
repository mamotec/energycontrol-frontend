import {Component, ViewChild, ViewContainerRef,} from '@angular/core';
import {DeviceGroupControllerService, PlantDeviceGroup} from "../../../api";
import {PlantGroupDashboardComponent} from "../plant-group-dashboard/plant-group-dashboard.component";

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.scss']
})
export class GroupDashboardComponent {

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
    this.groupContainer.createComponent(PlantGroupDashboardComponent).instance.deviceGroup = deviceGroup;
  }
}
