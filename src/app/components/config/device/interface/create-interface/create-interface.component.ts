import {Component} from '@angular/core';
import {DeviceClassEnum} from "../../DeviceClass.enum";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DeviceControllerService} from "../../../../../api";

@Component({
  selector: 'app-create-interface',
  templateUrl: './create-interface.component.html',
  styleUrls: ['./create-interface.component.scss']
})
export class CreateInterfaceComponent {

  devicesClasses = DeviceClassEnum
  interfaceForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private deviceService: DeviceControllerService) {
    this.interfaceForm = this.formBuilder.group({
      deviceClass: new FormControl(DeviceClassEnum.INVERTER)
    })
  }

  onSubmit() {
    if (this.interfaceForm.invalid) {
      return;
    }

    this.deviceService.createInterface(this.interfaceForm.get("deviceClass")?.value).subscribe({
      next: () => {
        console.log("Erfolgreich");
      }
    })


  }

}
