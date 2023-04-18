import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {HeaderComponent} from './shared/header/header.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {SidenavComponent} from './shared/sidenav/sidenav.component';
import {MatListModule} from "@angular/material/list";
import { InterfaceComponent } from './interface/interface.component';
import {ToastModule} from "primeng/toast";
import {StepsModule} from "primeng/steps";


@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    InterfaceComponent,
  ],
  exports: [
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    ToastModule,
    StepsModule
  ]
})
export class DashboardModule { }
