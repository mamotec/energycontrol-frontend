import {Component, OnInit} from '@angular/core';
import {DeviceControllerService} from "../../../api";

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.scss']
})
export class HealthCheckComponent implements OnInit {


  greenDot: string = "assets/images/green_dot.png";
  redDot: string = "assets/images/red_dot.png";

  nodeRedStatus: string = this.redDot;
  backendStatus: string = this.redDot;


  constructor(private deviceService: DeviceControllerService) {
    this.deviceService.isServiceAvailable().subscribe({
      next: (result) => {
        this.backendStatus = this.greenDot;
        if (result) {
          this.nodeRedStatus = this.greenDot;
        } else {
          this.nodeRedStatus = this.redDot;
        }
      }
    })
  }

  ngOnInit(): void {

  }

}
