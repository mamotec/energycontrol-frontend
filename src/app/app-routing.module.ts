import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {authGuard} from "./guard/auth.guard";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
import {CurrentPowerComponent} from "./components/yield-data/current-power/current-power.component";
import {DayDataComponent} from "./components/yield-data/day-data/day-data.component";
import {WeekDataComponent} from "./components/yield-data/week-data/week-data.component";
import {InterfaceComponent} from "./components/config/interface/interface.component";
import {DeviceComponent} from "./components/config/device/device/device.component";

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
        path: 'current-power',
        component: CurrentPowerComponent,
      },
      {
        path: 'day-data',
        component: DayDataComponent,
      },
      {
        path: 'week-data',
        component: WeekDataComponent,
      },
      // Konfiguration (Schnittstellen, Geräte)
      {
        path: 'interface',
        component: InterfaceComponent,
      },
      {
        path: 'device',
        component: DeviceComponent,
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
