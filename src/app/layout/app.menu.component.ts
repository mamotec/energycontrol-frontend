import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app'] }
                ]
            },
            {
                label: 'Konfiguration',
                items: [
                    { label: 'Geräte', icon: 'pi pi-fw pi-id-card', items: [
                        { label: 'Definition', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                        { label: 'Erkennung', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                        { label: 'Konfiguration', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },

                      ] },
                ]
            },
        ];
    }
}
