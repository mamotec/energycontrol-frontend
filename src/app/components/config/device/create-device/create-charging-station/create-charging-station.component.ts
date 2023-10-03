import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DeviceControllerService, InterfaceConfig} from "../../../../../api";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {LocalStorageService} from "../../../../../service/local-storage.service";
import {MessageService} from "primeng/api";
import TypeEnum = InterfaceConfig.TypeEnum;

@Component({
  selector: 'app-create-charging-station',
  templateUrl: './create-charging-station.component.html',
  styleUrls: ['./create-charging-station.component.scss']
})
export class CreateChargingStationComponent implements OnInit {
  deviceForm!: FormGroup
  deviceType: any;
  mode: any;

  constructor(private formBuilder: FormBuilder,
              private deviceService: DeviceControllerService,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef,
              private localStorageService: LocalStorageService,
              private messageService: MessageService) {
    this.deviceType = this.config.data.deviceType;

    this.mode = this.localStorageService.get('application-mode');
  }

  ngOnInit(): void {
    this.deviceForm = this.formBuilder.group({
      interfaceConfig: new FormControl(InterfaceConfig, [Validators.required, Validators.max(3)]),
      unitId: new FormControl(''),
      manufacturerId: new FormControl(''),
      deviceType: this.deviceType.deviceType,
      deviceId: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      deviceIdCharger: new FormControl('', [Validators.required]),
      ocppAvailable: new FormControl<boolean>(false, [Validators.required]),
    })

  }

  onSubmit() {
    if (this.deviceForm.invalid) {
      return;
    }

    let req: any = {
      interfaceConfig: this.deviceForm.value.interfaceConfig,
      manufacturerId: this.deviceForm.value.manufacturerId,
      deviceType: this.deviceType.deviceType,
      name: this.deviceForm.value.name,
      deviceId: this.deviceForm.value.deviceId,
      unitId: this.deviceForm.value.unitId,
      deviceIdCharger: this.deviceForm.value.deviceIdCharger,
      occpAvailable: this.deviceForm.value.ocppAvailable,
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

  protected readonly InterfaceConfig = InterfaceConfig;

  onFormValue($event: any) {
    this.deviceForm.patchValue($event);
  }
}
