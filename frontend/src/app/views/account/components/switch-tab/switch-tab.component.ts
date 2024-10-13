import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch-tab.component.html',
})
export class SwitchTabComponent {
  @Input() label!: string;
  @Input() isActive = false;

  @Output() switch: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.switch.emit();
  }
}
