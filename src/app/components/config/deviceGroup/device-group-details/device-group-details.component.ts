import {Component, OnInit} from '@angular/core';
import {Device, DeviceGroup, DeviceGroupControllerService, DeviceLinkRequest, PlantDeviceGroup} from "../../../../api";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {AddDeviceToGroupComponent} from "../add-device-to-group/add-device-to-group.component";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-device-group-details',
  templateUrl: './device-group-details.component.html',
  styleUrls: ['./device-group-details.component.scss']
})
export class DeviceGroupDetailsComponent implements OnInit {
  deviceGroup: DeviceGroup | undefined;
  items!: MenuItem[];

  constructor(private deviceGroupService: DeviceGroupControllerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadDeviceGroup();
    this.injectItems();
  }

  loadDeviceGroup() {
    const id = this.route.snapshot.params['id'];
    this.deviceGroupService.getGroup(id).subscribe({
      next: (res) => {
        this.deviceGroup = res;
      }
    });
  }

  deleteDeviceFromGroup(device: Device) {
    this.confirmationService.confirm({
      message: 'Wollen Sie das Gerät wirklich aus der Gruppe entfernen?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let req: DeviceLinkRequest = {
          deviceIds: []
        }
        // @ts-ignore
        req.deviceIds.push(device.id!);
        // @ts-ignore
        this.deviceGroupService.deleteDeviceFromGroup(req).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Erfolgreich',
              detail: 'Gerät entfernt',
              life: 3000
            });
            this.loadDeviceGroup();
          }, error: (err) => {
            this.messageService.add({severity: 'error', summary: 'Fehler', detail: err.error});
          }
        })
      }
    });
  }

  addDeviceToGroup() {
    const addDialog = this.dialogService.open(AddDeviceToGroupComponent, {
      data: {
        deviceGroup: this.deviceGroup
      },
      header: 'Gerät hinzufügen',
      width: '100%',
      height: '100%',
      maximizable: true
    });

    addDialog.onClose.subscribe(() => {
      this.loadDeviceGroup();
    });

  }


  asPlantGroup(group: DeviceGroup): PlantDeviceGroup {
    return group as PlantDeviceGroup;
  }

  protected readonly DeviceGroup = DeviceGroup;

  private injectItems() {
    this.items = [{
      label: 'Optionen',
      items: [
        {
          label: 'Gerät hinzufügen',
          icon: 'pi pi-plus',
          command: () => {
            this.addDeviceToGroup();
          }
        },
        {
          label: 'Gruppe löschen',
          icon: 'pi pi-trash',
          command: () => {
            this.deleteGroup(this.deviceGroup!);
          }
        },
        {separator: true},
        {label: 'Zurück', icon: 'pi pi-arrow-left', routerLink: ['../']}
      ]
    }
    ];
  }

  deleteGroup(group: DeviceGroup) {
    this.confirmationService.confirm({
      message: 'Wollen Sie die Gruppe wirklich löschen?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (group != null) {
          this.deviceGroupService.deleteGroup(group.id!).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Erfolgreich',
                detail: 'Gruppe gelöscht',
                life: 3000
              });
              this.router.navigate(['../'], {relativeTo: this.route});
            }
          })
        }
      }
    });
  }
}
