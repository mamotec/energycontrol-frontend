import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
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
import {InterfaceComponent} from './components/config/interface/interface.component';
import {TableModule} from "primeng/table";
import {AddButtonComponent} from './components/utils/add-button/add-button.component';
import {MatIconModule} from "@angular/material/icon";
import {CreateInterfaceConfigComponent} from './components/config/interface/create-interface/create-interface-config.component';
import {DropdownModule} from "primeng/dropdown";
import {ToastModule} from "primeng/toast";
import {ToastErrorHandler} from "./handler/toast-error-handler";
import {MessageService} from "primeng/api";
import {ApiModule, Configuration} from "./api";
import {ApiService} from "./service/api.service";
import {environment} from "../environments/environment";
import {AutoCompleteModule} from "primeng/autocomplete";
import { DeviceListComponent } from './components/config/device/device-list/device-list.component';
import {MessagesModule} from "primeng/messages";
import { CreateDeviceComponent } from './components/config/device/create-device/create-device.component';
import {InputNumberModule} from "primeng/inputnumber";
import { DeviceComponent } from './components/config/device/device/device.component';

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
    AddButtonComponent,
    CreateInterfaceConfigComponent,
    DeviceListComponent,
    CreateDeviceComponent,
    DeviceComponent,
  ],
    imports: [
        ApiModule,
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
        ToastModule,
        AutoCompleteModule,
        MessagesModule,
        InputNumberModule
    ],
  providers: [
    {
      provide: Configuration,
      useFactory: (authService: ApiService) => new Configuration(
        {
          basePath: environment.apiUrl,
          accessToken: authService.GetAccessToken.bind(authService)
        }
      ),
      deps: [ApiService],
      multi: false
    },
    {provide: ErrorHandler, useClass: ToastErrorHandler},
    MessageService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
