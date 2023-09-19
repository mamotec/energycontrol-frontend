import {Component, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {CreateInterfaceConfigComponent} from "./create-interface/create-interface-config.component";
import {MessageService} from "primeng/api";
import {InterfaceConfig, InterfaceControllerService} from "../../../api";

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss'],
  providers: [DialogService]
})
export class InterfaceComponent implements OnInit {
  interfaceConfigs: InterfaceConfig[] = [];

  constructor(private dialogRef: DialogService,
              private messageService: MessageService,
              private interfaceConfigService: InterfaceControllerService) {
  }

  ngOnInit(): void {
    this.loadInterfaces();
  }

  // region Schnittstellen
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
      styleClass: 'card',
      maximizable: true,
      width: '100%',
      height: '100%',
    })

    createDialog.onClose.subscribe(() => {
      this.loadInterfaces();
    })

  }

  onInterfaceRowDelete(interfaceToDelete: InterfaceConfig) {
    this.interfaceConfigService.deleteInterfaceConfig(interfaceToDelete.id as number).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Erfolgreich'});
        this.loadInterfaces();
      }
    });
  }

  // endregion

}
