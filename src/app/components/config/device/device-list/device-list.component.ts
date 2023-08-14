import {Component, OnInit} from '@angular/core';
import {Device, DeviceControllerService} from "../../../../api";

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  private devices: Device[] = []

  constructor(private deviceService: DeviceControllerService) {

  }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices() {
    this.deviceService.fetchDevices().subscribe((devices) => {
      this.devices = devices
      console.log(devices)
    })
  }

}
