import {Component, Input} from '@angular/core';
import {ChargingStationDevice} from "../../../../../api";

@Component({
  selector: 'app-charging-station-details',
  templateUrl: './charging-station-details.component.html',
  styleUrls: ['./charging-station-details.component.scss']
})
export class ChargingStationDetailsComponent {

  @Input()
  device!: ChargingStationDevice;

}
