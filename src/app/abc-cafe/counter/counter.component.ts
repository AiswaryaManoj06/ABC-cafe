import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerOrder } from '../../models/customer-order.model';
import { OrderInquiryComponent } from '../order-inquiry/order-inquiry.component';
import { BeverageSelectionComponent } from '../beverage-selection/beverage-selection.component';
import { OrderPlacementComponent } from '../order-placement/order-placement.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    RouterLink,
    OrderInquiryComponent,
    BeverageSelectionComponent,
    OrderPlacementComponent
  ],
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

  /** Internal state when CounterComponent is used as a routed page */
  orderInquiryActive: boolean = false;
  selectedBeverage: string = '';
  beverages: string[] = ['Coffee', 'Tea', 'Juice', 'Soda'];
  orderPlacedSuccess: boolean = false;
  lastPlacedOrder: CustomerOrder | null = null;

  /** Handles customer name changes */
  onNameChange(name: string): void {
    this.customerName = name;
    this.customerNameChange.emit(name);
  }

  /** Triggers the order inquiry process */
  onAskOrder(): void {
    if (this.customerName && this.customerName.trim()) {
      this.orderInquiryActive = true;
      this.orderPlacedSuccess = false;
      this.askOrder.emit(this.customerName.trim());
    }
  }

  /** Handles beverage selection */
  onBeverageSelect(beverage: string): void {
    this.selectedBeverage = beverage;
  }

  /** Handles order placed */
  onOrderPlaced(order: CustomerOrder): void {
    this.lastPlacedOrder = order;
    this.orderPlacedSuccess = true;
    this.customerName = '';
    this.selectedBeverage = '';
    this.orderInquiryActive = false;
  }
}
