import {Component, ElementRef, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {LayoutService} from "./service/app.layout.service";
import {LocalStorageService} from "../service/local-storage.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

  items!: MenuItem[];
  mode: any;

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService, private localeStorageService: LocalStorageService) {
    this.mode = this.localeStorageService.get("application-mode");
  }

  public logout(): void {
    localStorage.clear()
    window.location.reload();
  }

}
