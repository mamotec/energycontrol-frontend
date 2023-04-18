import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  private childRoutes: any[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((val: any) => {
      if (val.url != null) {
        if (val.url.includes("dashboard")) {
          this.childRoutes = []
          this.childRoutes = this.dashboardRoutes;
        } else if (val.url.includes("config")) {
          this.childRoutes = []
          this.childRoutes = this.configurationRoutes;
        }
      }

    })
  }

  get getChildRoutes() {
    return this.childRoutes;
  }

  get dashboardRoutes() {
    return [{
      description: "Momentanwerte",
      route: "/dashboard"
    }
    ]
  }

  get configurationRoutes() {
    return [
      {
        description: "Geräte",
        route: "/device"
      }
    ]
  }

}
