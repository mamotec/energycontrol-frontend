import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {
  @Output() add = new EventEmitter<void>();

  onAdd(): void {
    this.add.emit();
  }
}
