import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {YieldDataRoutingModule} from './yield-data-routing.module';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {ToastModule} from "primeng/toast";
import {StepsModule} from "primeng/steps";


@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    YieldDataRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    ToastModule,
    StepsModule
  ]
})
export class YieldDataModule { }
