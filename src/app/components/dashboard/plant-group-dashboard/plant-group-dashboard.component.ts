import {Component, OnInit} from '@angular/core';
import {DeviceGroup, DeviceGroupControllerService, PlantDataRepresentation, PlantDeviceGroup} from "../../../api";

@Component({
  selector: 'app-plant-group-dashboard',
  templateUrl: './plant-group-dashboard.component.html',
  styleUrls: ['./plant-group-dashboard.component.scss']
})
export class PlantGroupDashboardComponent implements OnInit {

  plantGroupRepresentation: PlantDataRepresentation = {type: PlantDeviceGroup.TypeEnum.Plant};
  deviceGroup!: DeviceGroup;

  constructor(private deviceGroupService: DeviceGroupControllerService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.deviceGroupService.fetchData(this.deviceGroup.id).subscribe((data) => {
      console.log(data);
    });
  }

}
