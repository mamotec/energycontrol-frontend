import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Device, DeviceControllerService, InterfaceConfig, TcpDevice} from "../../../../api";

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {

  device: Device | undefined

  constructor(private route: ActivatedRoute,
              private deviceService: DeviceControllerService) {
  }

  ngOnInit(): void {
    this.loadDevice();
  }

  loadDevice() {
    const id = this.route.snapshot.params['id'];
    this.deviceService.fetchDevice(id).subscribe({
      next: (res) => {
        this.device = res;
      }
    });
  }

  asTcpDevice(device: Device): TcpDevice {
    return device as TcpDevice;
  }


  protected readonly InterfaceConfig = InterfaceConfig;
}
