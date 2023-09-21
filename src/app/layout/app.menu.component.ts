import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../service/local-storage.service";

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(private localStorageService: LocalStorageService){
  }

  ngOnInit() {
    let applicationMode = this.localStorageService.get("application-mode")
    let isHomeMode = applicationMode == "HOME"
    let isPlantMode = applicationMode == "PLANT"

    this.model = [
      {
        label: 'Allgemein',
        show: isHomeMode || isPlantMode,
        items: [
          {label: 'Dashboard', routerLink: ['/dashboard'], show: isHomeMode || isPlantMode},
        ],
      },
      {
        label: 'Konfiguration',
        show: isHomeMode || isPlantMode,
        items: [
          {label: 'Schnittstellen', routerLink: ['/interface'], show: isHomeMode || isPlantMode},
          {label: 'Geräte', routerLink: ['/device'], show: isHomeMode || isPlantMode},
          {label: 'Gruppen', routerLink: ['/group'], show: isPlantMode},
          {label: "Direktvermarktung", routerLink: ['/direct-marketing'], show: isPlantMode},
          {label: "Einspeisemanagement", routerLink: ['/feed-in-management'], show: isPlantMode},
        ]
      },
    ];
  }
}
