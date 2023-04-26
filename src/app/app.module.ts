import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from './dashboard/dashboard.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {MegaMenuModule} from "primeng/megamenu";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {AppLayoutModule} from "./layout/app.layout.module";
import {CurrentPowerComponent} from './components/yield-data/current-power/current-power.component';
import {DayDataComponent} from './components/yield-data/day-data/day-data.component';
import {WeekDataComponent} from './components/yield-data/week-data/week-data.component';
import {InterfaceComponent} from './components/config/device/interface/interface.component';
import {IdentificationComponent} from './components/config/identification/identification.component';
import {DeviceConfigComponent} from './components/config/device-config/device-config.component';
import {TableModule} from "primeng/table";
import {AddButtonComponent} from './components/utils/add-button/add-button.component';
import {MatIconModule} from "@angular/material/icon";
import {CreateInterfaceComponent} from './components/config/device/interface/create-interface/create-interface.component';
import {DropdownModule} from "primeng/dropdown";
import {TokenInterceptorService} from "./interceptor/token-interceptor.service";
import {ToastModule} from "primeng/toast";
import {ToastErrorHandler} from "./handler/toast-error-handler";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AuthLayoutComponent,
    CurrentPowerComponent,
    DayDataComponent,
    WeekDataComponent,
    InterfaceComponent,
    IdentificationComponent,
    DeviceConfigComponent,
    AddButtonComponent,
    CreateInterfaceComponent,
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
    MatMenuModule,
    AppLayoutModule,
    TableModule,
    MatIconModule,
    DropdownModule,
    ToastModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: ToastErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    MessageService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
