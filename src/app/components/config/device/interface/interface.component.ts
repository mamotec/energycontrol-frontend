import {Component} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {CreateInterfaceConfigComponent} from "./create-interface/create-interface-config.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss'],
  providers: [DialogService]
})
export class InterfaceComponent {
  items: any[] = [];


  constructor(private dialogRef: DialogService, private messageService: MessageService) {
  }

  createInterfaceConfig() {
    const createDialog = this.dialogRef.open(CreateInterfaceConfigComponent, {
      header: 'Schnittstelle definieren',
      width: '30%',
      height: '50%',
      maximizable: true
    })

    createDialog.onClose.subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Erfolgreich'});
    })


  }
}
