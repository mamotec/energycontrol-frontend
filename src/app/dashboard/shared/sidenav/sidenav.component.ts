import {Component} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  constructor(private router: Router) {
    this.router.events.subscribe((val: any) => {
      console.log(val.url)
    })
    console.log(this.router.url)
  }


}
