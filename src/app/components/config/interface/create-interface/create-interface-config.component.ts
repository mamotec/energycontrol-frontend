import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InterfaceControllerService} from "../../../../api";
import {InterfaceConfig} from "../../../../api/model/interfaceConfig";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-create-interface',
  templateUrl: './create-interface-config.component.html',
  styleUrls: ['./create-interface-config.component.scss']
})
export class CreateInterfaceConfigComponent {

  interfaceTypes = InterfaceConfig.TypeEnum;
  interfaceForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              public ref: DynamicDialogRef,
              private interfaceConfigService: InterfaceControllerService) {
    this.interfaceForm = this.formBuilder.group({
      interfaceType: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.required])
    })
  }

  onSubmit() {
    if (this.interfaceForm.invalid) {
      return;
    }

    let req: InterfaceConfig = {
      type: this.interfaceForm.value.interfaceType.value,
      description : this.interfaceForm.value.description,
    }

    this.interfaceConfigService.createInterfaceConfig(req).subscribe({
      next: () => {
        this.ref.close();
        this.messageService.add({ severity: 'success', summary: 'Erfolgreich'});
      }
    })

  }

}
