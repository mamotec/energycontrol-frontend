import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor() { }

    ngOnInit() {
        this.model = [
            {
                label: 'Ertragsdaten',
                items: [
                    { label: 'Momentanwerte', icon: 'pi pi-fw pi-home', routerLink: ['/app'], items: [
                        { label: 'Aktuelle Leistung', routerLink: ['/app'] },
                        { label: 'Tageswerte', routerLink: ['/app'] },
                        { label: 'Wochenwerte', routerLink: ['/app'] },

                      ] },
                ]
            },
            {
                label: 'Konfiguration',
                items: [
                    { label: 'Geräte', icon: 'pi pi-fw pi-bolt', items: [
                        { label: 'Definition', routerLink: ['/app'] },
                        { label: 'Erkennung', routerLink: ['/app'] },
                        { label: 'Konfiguration', routerLink: ['/app'] },
                      ] },
                ]
            },
        ];
    }
}
