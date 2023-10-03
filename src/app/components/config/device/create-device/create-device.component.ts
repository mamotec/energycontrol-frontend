import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AuthenticationResponse,
  DeviceYaml,
  InterfaceConfig,
  InterfaceControllerService,
  ManufacturerYaml
} from "../../../../api";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {LocalStorageService} from "../../../../service/local-storage.service";
import ApplicationModeEnum = AuthenticationResponse.ApplicationModeEnum;

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
  @Input()
  visible: boolean = true;
  @Output()
  formChange = new EventEmitter<any>();

  interfaceConfigs: InterfaceConfig[] = [];
  manufacturer: ManufacturerYaml[] = [];
  models: DeviceYaml[] = [];
  mode: any;

  constructor(private interfaceService: InterfaceControllerService,
              private localStorageService: LocalStorageService,
              private config: DynamicDialogConfig) {
    this.interfaceConfigs = this.config.data.interfaceConfigs;
    this.mode = this.localStorageService.get('application-mode');
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
      this.interfaceService.fetchDevicesForManufacturer(this.deviceForm.value.manufacturerId, this.deviceType.deviceType).subscribe({
        next: (res) => {
          this.models = res;
        }
      })
    }
  }

  emitFormValue() {
    this.formChange.emit(this.deviceForm.value)
  }

  protected readonly ApplicationModeEnum = ApplicationModeEnum;
}
