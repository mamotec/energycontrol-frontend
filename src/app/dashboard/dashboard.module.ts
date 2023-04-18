import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent
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
    MatListModule
  ]
})
export class DashboardModule { }
