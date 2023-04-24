import {Component} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {CreateInterfaceComponent} from "./create-interface/create-interface.component";

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss'],
  providers: [DialogService]
})
export class InterfaceComponent {
  products: any[] = [];


  constructor(private dialogRef: DialogService) {
  }

  createInterface() {
    const createDialog = this.dialogRef.open(CreateInterfaceComponent, {
      header: 'Schnittstelle definieren',
      width: '30%',
      height: '30%',
      maximizable: true
    })
    console.log("Echt gut")
  }
}
