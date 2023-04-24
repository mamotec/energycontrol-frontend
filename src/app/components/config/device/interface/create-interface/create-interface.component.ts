import {Component} from '@angular/core';
import {DeviceClassEnum} from "../../DeviceClass.enum";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DeviceService} from "../../../../../service/device.service";

@Component({
  selector: 'app-create-interface',
  templateUrl: './create-interface.component.html',
  styleUrls: ['./create-interface.component.scss']
})
export class CreateInterfaceComponent {

  devicesClasses = DeviceClassEnum
  interfaceForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private deviceService: DeviceService) {
    this.interfaceForm = this.formBuilder.group({
      deviceClass: new FormControl(DeviceClassEnum.INVERTER)
    })
  }

  onSubmit() {
    if (this.interfaceForm.invalid) {
      return;
    }

    console.log("Moin meister")

    this.deviceService.createInterface(this.interfaceForm.get("deviceClass")?.value);


  }

}
