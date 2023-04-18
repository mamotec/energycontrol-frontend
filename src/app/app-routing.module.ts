import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "./guard/auth.guard";
import {DashboardLayoutComponent} from "./layouts/dashboard-layout/dashboard-layout.component";
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";

const routes: Routes = [
  // App routes
  {
    path: '',
    canActivate: [authGuard],
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule)
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
