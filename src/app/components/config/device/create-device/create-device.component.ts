import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeviceYaml, InterfaceConfig, InterfaceControllerService, ManufacturerYaml} from "../../../../api";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss']
})
export class CreateDeviceComponent implements OnInit {

  @Input()
  deviceForm: any;
  @Input()
  deviceType: any;
  @Output()
  formChange = new EventEmitter<any>();

  interfaceConfigs: InterfaceConfig[] = [];
  manufacturer: ManufacturerYaml[] = [];
  models: DeviceYaml[] = [];

  constructor(private interfaceService: InterfaceControllerService,
              private config: DynamicDialogConfig) {
    this.interfaceConfigs = this.config.data.interfaceConfigs;
  }

  ngOnInit(): void {
    this.loadManufacturers()
  }

  loadManufacturers() {
    this.interfaceService.fetchManufactures(this.deviceType).subscribe({
      next: (res) => {
        this.manufacturer = res;
      }
    })
  }

  loadModelsByManufacturer() {
    this.emitFormValue()
    if (this.deviceForm.value.manufacturerId != null && this.deviceForm.value.manufacturerId != "" &&
      this.deviceType != null) {
      this.interfaceService.fetchDevicesForManufacturer(this.deviceForm.value.manufacturerId, this.deviceType).subscribe({
        next: (res) => {
          this.models = res;
        }
      })
    }
  }

  emitFormValue() {
    this.formChange.emit(this.deviceForm.value)
  }
}
