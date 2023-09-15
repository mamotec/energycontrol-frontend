import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DeviceControllerService, DeviceCreateRequest, DeviceYaml, InterfaceConfig, InterfaceControllerService, ManufacturerYaml} from "../../../../api";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {InterfaceConfigDao} from "../../../../api/model/interfaceConfigDao";
import TypeEnum = InterfaceConfigDao.TypeEnum;

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
      unitId: new FormControl(''),
      manufacturerId: new FormControl('', [Validators.required]),
      deviceType: new FormControl('', [Validators.required]),
      deviceId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      host: new FormControl(''),
      port: new FormControl(''),
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

    let req: any = {
      interfaceConfig: this.deviceForm.value.interfaceConfig,
      manufacturerId: this.deviceForm.value.manufacturerId,
      deviceType: this.deviceForm.value.deviceType.value,
      name: this.deviceForm.value.name,
      deviceId: this.deviceForm.value.deviceId,
    }
    if (this.deviceForm.value.interfaceConfig.type == TypeEnum.Tcp) {
      req.host = this.deviceForm.value.host;
      req.port = this.deviceForm.value.port;
      req.interfaceType = TypeEnum.Tcp;
    } else if (this.deviceForm.value.interfaceConfig.type == TypeEnum.Rs485) {
      req.unitId = this.deviceForm.value.unitId;
      req.interfaceType = TypeEnum.Rs485;
    }

    this.deviceService.createDevice(req).subscribe({
      next: () => {
        this.ref.close();
        this.messageService.add({severity: 'success', summary: 'Erfolgreich'});
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: err.error});
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


  protected readonly InterfaceConfig = InterfaceConfig;
}
