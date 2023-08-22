import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DeviceControllerService, DeviceCreateRequest, DeviceYaml, InterfaceConfig, InterfaceControllerService, ManufacturerYaml} from "../../../../api";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss']
})
export class CreateDeviceComponent implements OnInit {

  deviceForm: FormGroup;
  interfaceConfigs: InterfaceConfig[] = [];
  manufacturer: ManufacturerYaml[] = [];
  models: DeviceYaml[] = [];
  deviceTypes = DeviceYaml.DeviceTypeEnum;

  constructor(private formBuilder: FormBuilder,
              private interfaceService: InterfaceControllerService,
              private config: DynamicDialogConfig,
              private deviceService: DeviceControllerService,
              public ref: DynamicDialogRef,
              private messageService: MessageService) {
    this.interfaceConfigs = this.config.data.interfaceConfigs;

    this.deviceForm = this.formBuilder.group({
      interfaceConfig: new FormControl(InterfaceConfig, [Validators.required, Validators.max(3)]),
      unitId: new FormControl('', [Validators.required]),
      manufacturerId: new FormControl('', [Validators.required]),
      deviceType: new FormControl('', [Validators.required]),
      deviceId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.loadManufacturers();
  }

  loadManufacturers() {
    this.interfaceService.fetchManufactures().subscribe({
      next: (res) => {
        this.manufacturer = res;
      }
    })
  }

  onSubmit() {
    if (this.deviceForm.invalid) {
      return;
    }

    let req: DeviceCreateRequest = {
      interfaceConfig: this.deviceForm.value.interfaceConfig,
      unitId: this.deviceForm.value.unitId,
      manufacturerId: this.deviceForm.value.manufacturerId,
      deviceType: this.deviceForm.value.deviceType.value,
      name: this.deviceForm.value.name,
      deviceId: this.deviceForm.value.deviceId,
    }

    this.deviceService.createDevice(req).subscribe({
      next: () => {
        this.ref.close();
        this.messageService.add({severity: 'success', summary: 'Erfolgreich'});
      }
    })
  }

  loadModelsByManufacturer() {
    // oder
    if (this.deviceForm.value.manufacturerId != null && this.deviceForm.value.manufacturerId != "" &&
      this.deviceForm.value.deviceType.value != null) {
      this.interfaceService.fetchDevicesForManufacturer(this.deviceForm.value.manufacturerId, this.deviceForm.value.deviceType.value).subscribe({
        next: (res) => {
          this.models = res;
        }
      })
    }

  }


}
