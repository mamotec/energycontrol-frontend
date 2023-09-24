import {Component,} from '@angular/core';
import {LocalStorageService} from "../../../service/local-storage.service";

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.scss']
})
export class GroupDashboardComponent {
  applicationMode: any = this.localStorageService.get('application-mode')

  constructor(private localStorageService: LocalStorageService) {
  }


}
