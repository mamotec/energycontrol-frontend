import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DeviceControllerService, DeviceYaml, InterfaceConfig, InterfaceControllerService, ManufacturerYaml} from "../../../../api";
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
  deviceTypes: Array<string> = [];

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
    this.loadDeviceTypes()
  }

  loadManufacturers() {
    this.interfaceService.fetchManufactures(this.deviceForm.value.deviceType.value).subscribe({
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
      unitId: this.deviceForm.value.unitId,
    }
    if (this.deviceForm.value.interfaceConfig.type == TypeEnum.Tcp) {
      req.host = this.deviceForm.value.host;
      req.port = this.deviceForm.value.port;
      req.interfaceType = TypeEnum.Tcp;
    } else if (this.deviceForm.value.interfaceConfig.type == TypeEnum.Rs485) {
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

  private loadDeviceTypes() {
    this.deviceService.fetchDeviceTypes().subscribe({
      next: (res) => {
        this.deviceTypes = res;
      }
    });
  }
}
