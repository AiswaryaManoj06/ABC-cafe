import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beverage-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beverage-selection.component.html',
  styleUrls: ['./beverage-selection.component.css']
})
export class BeverageSelectionComponent {
  /** List of available beverage options */
  @Input() beverages: string[] = ['Coffee', 'Tea', 'Juice', 'Soda'];

  /** Currently selected beverage */
  @Input() selectedBeverage: string = '';

  /** Emits the selected beverage for two-way binding */
  @Output() selectedBeverageChange = new EventEmitter<string>();

  /** Emits when a beverage selection is made */
  @Output() beverageSelected = new EventEmitter<string>();

  /** Handles beverage selection */
  onSelectBeverage(beverage: string): void {
    this.selectedBeverage = beverage;
    this.selectedBeverageChange.emit(beverage);
    this.beverageSelected.emit(beverage);
  }
}
