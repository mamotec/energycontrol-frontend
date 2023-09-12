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
        label: 'Allgemein',  items: [
          {label: 'Dashboard', routerLink: ['/dashboard']}
        ]
      },
      {
        label: 'Konfiguration',
        items: [
          {label: 'Schnittstellen', routerLink: ['/interface']},
          {label: 'Geräte', routerLink: ['/device']},
          {label: 'Gruppen', routerLink: ['/group']},
          {label: "Direktvermarktung", routerLink: ['/direct-marketing']},
        ]
      },
    ];
  }
}
