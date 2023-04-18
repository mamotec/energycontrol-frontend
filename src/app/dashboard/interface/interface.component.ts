import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent {
  activeIndex: number = 0;

  items: MenuItem[] = [
    {
      label: 'Definition',
      command: () => {
        this.activeIndex = 0
      },
      routerLink: 'definition'
    },
    {
      label: 'Erkennung',
      command: () => {
        this.activeIndex = 1
      }, routerLink: 'seat'
    },
    {
      label: 'Konfiguration',
      command: () => {
        this.activeIndex = 2
      }, routerLink: 'payment'
    }
  ]

}
