import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Device, DeviceControllerService, InterfaceConfig, TcpDevice} from "../../../../api";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {
  device: Device | undefined
  items!: MenuItem[];

  constructor(private route: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private router: Router,
              private messageService: MessageService,
              private deviceService: DeviceControllerService) {
  }

  ngOnInit(): void {
    this.loadDevice();
    this.injectItems();

  }

  loadDevice() {
    const id = this.route.snapshot.params['id'];
    this.deviceService.fetchDevice(id).subscribe({
      next: (res) => {
        this.device = res;
      }
    });
  }

  asTcpDevice(device: Device): TcpDevice {
    return device as TcpDevice;
  }

  deleteDevice(device: Device) {
    this.confirmationService.confirm({
      message: 'Wollen Sie das Gerät wirklich löschen? Das Gerät wird aus der Aufzeichnung entfernt - Dieser Vorgang kann nicht rückgängig gemacht werden!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (device != null) {
          this.deviceService.deleteDevice(device.id!).subscribe({
            next: () => {
              this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Geräte gelöscht', life: 3000});
              this.router.navigate(['device'],);
            }
          })
        }
      }
    });
  }

  private injectItems() {
    this.items = [{
      label: 'Optionen',
      items: [
        {
          label: 'Gerät löschen',
          icon: 'pi pi-trash',
          command: () => {
            this.deleteDevice(this.device!);
          }
        },
        {separator: true},
        {label: 'Zurück', icon: 'pi pi-arrow-left', routerLink: ['../']}
      ]
    }
    ];
  }

  protected readonly InterfaceConfig = InterfaceConfig;
}
