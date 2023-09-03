import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DeviceGroup, DeviceGroupControllerService} from "../../../../api";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-create-device-group',
  templateUrl: './create-device-group.component.html',
  styleUrls: ['./create-device-group.component.scss']
})
export class CreateDeviceGroupComponent {

  deviceGroupForm: FormGroup;
  deviceGroupTypes = DeviceGroup.TypeEnum;

  constructor(private formBuilder: FormBuilder,
              private ref: DynamicDialogRef,
              private messageService: MessageService,
              private deviceGroupService: DeviceGroupControllerService) {
    this.deviceGroupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    })
  }

  onSubmit() {
    if (this.deviceGroupForm.invalid) {
      return;
    }

    let req: DeviceGroup = {
      name: this.deviceGroupForm.value.name,
      type: this.deviceGroupForm.value.type.value,
    }

    this.deviceGroupService.createGroup(req).subscribe({
      next: () => {
        this.ref.close();
        this.messageService.add({severity: 'success', summary: 'Erfolgreich'});
      }, error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: err.error});
      }
    })
  }

}
