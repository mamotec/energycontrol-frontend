import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Interface, InterfaceConfigDao, InterfaceControllerService} from "../../../../../api";
import {InterfaceConfig} from "../../../../../api/model/interfaceConfig";
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-create-interface',
  templateUrl: './create-interface-config.component.html',
  styleUrls: ['./create-interface-config.component.scss']
})
export class CreateInterfaceConfigComponent implements OnInit {

  interfaceTypes = InterfaceConfig.TypeEnum;
  protocols: Interface[] = [];
  interfaceForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              private interfaceConfigService: InterfaceControllerService) {
    this.interfaceForm = this.formBuilder.group({
      interfaceType: new FormControl(InterfaceConfig.TypeEnum.Rs485),
      protocol: new FormControl()
    })
  }

  ngOnInit(): void {
    this.interfaceConfigService.fetchInterfaces().subscribe(protocols => {
      this.protocols = protocols;
    })
  }

  onSubmit() {
    if (this.interfaceForm.invalid) {
      return;
    }

    let req: InterfaceConfigDao = {
      protocolId: this.interfaceForm.value.protocol,
      type: this.interfaceForm.value.interfaceType
    }

    this.interfaceConfigService.createInterfaceConfig(req).subscribe({
      next: () => {
        this.ref.close();
      }
    })

  }

}
