import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import {MegaMenuModule} from "primeng/megamenu";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSidenavModule} from "@angular/material/sidenav";
import {DashboardModule} from "./dashboard/dashboard.module";
import {MatMenuModule} from "@angular/material/menu";
import {ConfigComponent} from "./dashboard/config/config.component";
import {AppLayoutModule} from "./layout/app.layout.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ConfigComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    RippleModule,
    MegaMenuModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    DashboardModule,
    MatMenuModule,
    AppLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
