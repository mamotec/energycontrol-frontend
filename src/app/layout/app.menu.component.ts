import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Allgemein',
        show: true,
        items: [
          {label: 'Dashboard', routerLink: ['/dashboard'], show: true},
        ],
      },
      {
        label: 'Konfiguration',
        show: true,
        items: [
          {label: 'Schnittstellen', routerLink: ['/interface'], show: true},
          {label: 'Geräte', routerLink: ['/device'], show: true},
          {label: 'Gruppen', routerLink: ['/group'], show: true},
          {label: "Direktvermarktung", routerLink: ['/direct-marketing'], show: true},
          {label: "Einspeisemanagement", routerLink: ['/feed-in-management'], show: true},
        ]
      },
    ];
  }
}
