import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private authService$: AuthService) {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  get authService(): AuthService {
    return this.authService$;
  }
}
