import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationResponse, DeviceControllerService, InterfaceConfig} from "../../../../../api";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {LocalStorageService} from "../../../../../service/local-storage.service";
import TypeEnum = InterfaceConfig.TypeEnum;
import ApplicationModeEnum = AuthenticationResponse.ApplicationModeEnum;

@Component({
  selector: 'app-create-hybrid-inverter',
  templateUrl: './create-hybrid-inverter.component.html',
  styleUrls: ['./create-hybrid-inverter.component.scss']
})
export class CreateHybridInverterComponent implements OnInit {

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
      interfaceConfig: new FormControl({}, [Validators.max(3)]),
      unitId: new FormControl(''),
      manufacturerId: new FormControl('', [Validators.required]),
      deviceType: this.deviceType.deviceType,
      deviceId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      host: new FormControl(''),
      port: new FormControl(''),
    })

    if (this.mode == 'HOME') {
      this.deviceForm.addControl('peakKilowatt', new FormControl('', [Validators.required]));
    }
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
    }
    if (this.mode == ApplicationModeEnum.Home || this.deviceForm.value.interfaceConfig.type == TypeEnum.Tcp ) {
      req.host = this.deviceForm.value.host;
      req.port = this.deviceForm.value.port;
      req.interfaceType = TypeEnum.Tcp;
    } else if (this.deviceForm.value.interfaceConfig.type == TypeEnum.Rs485) {
      req.interfaceType = TypeEnum.Rs485;
    }

    if (this.mode == 'HOME') {
      req.peakKilowatt = this.deviceForm.value.peakKilowatt;
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

  protected readonly AuthenticationResponse = AuthenticationResponse;
  protected readonly ApplicationModeEnum = ApplicationModeEnum;
}
