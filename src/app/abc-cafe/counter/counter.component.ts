import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  /** Customer's name entered in the input field */
  @Input() customerName: string = '';

  /** Emits updated customer name for two-way binding */
  @Output() customerNameChange = new EventEmitter<string>();

  /** Emits when "Ask Order" button is pressed to trigger order inquiry process */
  @Output() askOrder = new EventEmitter<string>();

  /** Current date displayed below the counter heading using DatePipe */
  currentDate: Date = new Date();

  /** Handles customer name changes */
  onNameChange(name: string): void {
    this.customerName = name;
    this.customerNameChange.emit(name);
  }

  /** Triggers the order inquiry process */
  onAskOrder(): void {
    if (this.customerName && this.customerName.trim()) {
      this.askOrder.emit(this.customerName.trim());
    }
  }
}
