import {Component, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {CreateInterfaceConfigComponent} from "./create-interface/create-interface-config.component";
import {MessageService} from "primeng/api";
import {InterfaceConfigDao, InterfaceControllerService} from "../../../../api";
import {InterfaceConfig} from "../../../../api/model/interfaceConfig";

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss'],
  providers: [DialogService]
})
export class InterfaceComponent implements OnInit {
  interfaceConfigs: InterfaceConfigDao[] = [];


  constructor(private dialogRef: DialogService,
              private messageService: MessageService,
              private interfaceConfigService: InterfaceControllerService) {
  }

  ngOnInit(): void {
    this.loadInterfaces();
  }

  loadInterfaces() {
    this.interfaceConfigService.fetchInterfaceConfigs().subscribe({
      next: (items) => {
        this.interfaceConfigs = items;
      }
    })
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
      this.loadInterfaces();
    })

  }

}
