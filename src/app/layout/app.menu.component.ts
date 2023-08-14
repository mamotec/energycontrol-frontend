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
        label: 'Ertragsdaten',
        items: [
          {
            label: 'Momentanwerte', icon: 'pi pi-fw pi-home', items: [
              {label: 'Aktuelle Leistung', routerLink: ['/current-power']},
              {label: 'Tageswerte', routerLink: ['/day-data']},
              {label: 'Wochenwerte', routerLink: ['/week-data']},

            ]
          },
        ]
      },
      {
        label: 'Konfiguration',
        items: [
          {
            label: 'Geräte', icon: 'pi pi-fw pi-bolt', items: [
              {label: 'Definition', routerLink: ['/interface']},
              {label: 'Erkennung', routerLink: ['/identification']}
            ]
          },
        ]
      },
    ];
  }
}
