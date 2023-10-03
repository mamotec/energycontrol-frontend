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
import {InterfaceComponent} from './components/config/interface/interface.component';
import {TableModule} from "primeng/table";
import {AddButtonComponent} from './components/utils/add-button/add-button.component';
import {MatIconModule} from "@angular/material/icon";
import {CreateInterfaceConfigComponent} from './components/config/interface/create-interface/create-interface-config.component';
import {DropdownModule} from "primeng/dropdown";
import {ToastModule} from "primeng/toast";
import {ToastErrorHandler} from "./handler/toast-error-handler";
import {ConfirmationService, MessageService} from "primeng/api";
import {ApiModule, Configuration} from "./api";
import {ApiService} from "./service/api.service";
import {environment} from "../environments/environment";
import {AutoCompleteModule} from "primeng/autocomplete";
import {MessagesModule} from "primeng/messages";
import { CreateDeviceComponent } from './components/config/device/create-device/create-device.component';
import {InputNumberModule} from "primeng/inputnumber";
import { DeviceComponent } from './components/config/device/device/device.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { DeleteDialogComponent } from './components/utils/delete-dialog/delete-dialog.component';
import {DialogService} from "primeng/dynamicdialog";
import { HealthCheckComponent } from './components/health/health-check/health-check.component';
import {ChipModule} from "primeng/chip";
import { DeviceGroupComponent } from './components/config/deviceGroup/device-group/device-group.component';
import { CreateDeviceGroupComponent } from './components/config/deviceGroup/create-device-group/create-device-group.component';
import { AddDeviceToGroupComponent } from './components/config/deviceGroup/add-device-to-group/add-device-to-group.component';
import { DirectMarketingComponent } from './components/config/directMarketing/direct-marketing/direct-marketing.component';
import {PickListModule} from "primeng/picklist";
import {SelectButtonModule} from "primeng/selectbutton";
import { GroupDashboardComponent } from './components/dashboard/group-dashboard/group-dashboard.component';
import { DataDashboardComponent } from './components/dashboard/data-dashboard/data-dashboard.component';
import { PlantGroupDashboardComponent } from './components/dashboard/plant-group-dashboard/plant-group-dashboard.component';
import { FeedInManagementComponent } from './components/config/feedInManagement/feed-in-management/feed-in-management.component';
import {DataViewModule} from "primeng/dataview";
import {ContextMenuModule} from "primeng/contextmenu";
import {BadgeModule} from "primeng/badge";
import { DeviceGroupDetailsComponent } from './components/config/deviceGroup/device-group-details/device-group-details.component';
import { BackButtonComponent } from './components/utils/back-button/back-button.component';
import {MenuModule} from "primeng/menu";
import { DeviceDetailsComponent } from './components/config/device/device-details/device-details.component';
import { HomeGroupDashboardComponent } from './components/dashboard/home-group-dashboard/home-group-dashboard.component';
import {CreateHybridInverterComponent} from "./components/config/device/create-device/create-hybrid-inverter/create-hybrid-inverter.component";
import {SplitButtonModule} from "primeng/splitbutton";
import { CreateChargingStationComponent } from './components/config/device/create-device/create-charging-station/create-charging-station.component';
import {InputSwitchModule} from "primeng/inputswitch";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AuthLayoutComponent,
    InterfaceComponent,
    AddButtonComponent,
    CreateInterfaceConfigComponent,
    CreateDeviceComponent,
    DeviceComponent,
    DeleteDialogComponent,
    HealthCheckComponent,
    DeviceGroupComponent,
    CreateDeviceGroupComponent,
    AddDeviceToGroupComponent,
    DirectMarketingComponent,
    GroupDashboardComponent,
    DataDashboardComponent,
    PlantGroupDashboardComponent,
    FeedInManagementComponent,
    DeviceGroupDetailsComponent,
    BackButtonComponent,
    DeviceDetailsComponent,
    HomeGroupDashboardComponent,
    CreateHybridInverterComponent,
    CreateChargingStationComponent,
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
        InputNumberModule,
        ConfirmDialogModule,
        ChipModule,
        PickListModule,
        SelectButtonModule,
        DataViewModule,
        ContextMenuModule,
        BadgeModule,
        MenuModule,
        SplitButtonModule,
        InputSwitchModule
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
    MessageService, ConfirmationService, DialogService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
