import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {authGuard} from "./guard/auth.guard";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {InterfaceComponent} from "./components/config/interface/interface.component";
import {DeviceComponent} from "./components/config/device/device/device.component";
import {HealthCheckComponent} from "./components/health/health-check/health-check.component";
import {DeviceGroupComponent} from "./components/config/deviceGroup/device-group/device-group.component";
import {DirectMarketingComponent} from "./components/config/directMarketing/direct-marketing/direct-marketing.component";
import {DataDashboardComponent} from "./components/dashboard/data-dashboard/data-dashboard.component";

const routes: Routes = [
  // App routes
  {
    path: '',
    pathMatch: "prefix",
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      // Momentanwerte
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
        path: 'group',
        component: DeviceGroupComponent,
      },
      {
        path: 'direct-marketing',
        component: DirectMarketingComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      // Healtcheck
      {
        path: 'health',
        component: HealthCheckComponent,
      }
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
