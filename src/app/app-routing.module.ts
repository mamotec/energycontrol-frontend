import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {authGuard} from "./guard/auth.guard";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {InterfaceComponent} from "./components/config/interface/interface.component";
import {DeviceComponent} from "./components/config/device/device/device.component";
import {DeviceGroupComponent} from "./components/config/deviceGroup/device-group/device-group.component";
import {DirectMarketingComponent} from "./components/config/directMarketing/direct-marketing/direct-marketing.component";
import {DataDashboardComponent} from "./components/dashboard/data-dashboard/data-dashboard.component";
import {FeedInManagementComponent} from "./components/config/feedInManagement/feed-in-management/feed-in-management.component";
import {DeviceGroupDetailsComponent} from "./components/config/deviceGroup/device-group-details/device-group-details.component";
import {DeviceDetailsComponent} from "./components/config/device/device-details/device-details.component";
import {EnergyManagementComponent} from "./components/config/energy-management/energy-management.component";

const routes: Routes = [
  // App routes
  {
    path: '',
    pathMatch: "prefix",
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      // Dashboard
      {
        path: 'dashboard',
        component: DataDashboardComponent,
      },
      // Konfiguration (Schnittstellen, Geräte, Gruppen)
      {
        path: 'interface',
        component: InterfaceComponent,
      },
      {
        path: 'device',
        component: DeviceComponent,
      },
      {
        path: 'device/:id',
        component: DeviceDetailsComponent,
      },
      {
        path: 'group',
        component: DeviceGroupComponent,
      },
      {
        path: 'group/:id',
        component: DeviceGroupDetailsComponent,
      },
      {
        path: 'direct-marketing',
        component: DirectMarketingComponent,
      },
      {
        path: 'feed-in-management',
        component: FeedInManagementComponent,
      },
      {
        path: 'energy-management',
        component: EnergyManagementComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ]
  },



  // Auth routes
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
