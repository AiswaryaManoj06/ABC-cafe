import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerOrder } from '../models/customer-order.model';
import { CounterComponent } from './counter/counter.component';
import { OrderInquiryComponent } from './order-inquiry/order-inquiry.component';
import { BeverageSelectionComponent } from './beverage-selection/beverage-selection.component';
import { OrderPlacementComponent } from './order-placement/order-placement.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

export type { CustomerOrder } from '../models/customer-order.model';

@Component({
  selector: 'app-abc-cafe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CounterComponent,
    OrderInquiryComponent,
    BeverageSelectionComponent,
    OrderPlacementComponent,
    OrderSummaryComponent
  ],
  templateUrl: './abc-cafe.component.html',
  styleUrls: ['./abc-cafe.component.css']
})
export class AbcCafeComponent {
  /** Customer's name entered in the counter */
  customerName = '';

  /** Flag indicating whether the order inquiry process is active */
  orderInquiryActive = false;

  /** Currently selected beverage */
  selectedBeverage = '';

  /** List of available beverage options */
  beverages: string[] = ['Coffee', 'Tea', 'Juice', 'Soda'];

  /** Accumulated customer orders */
  customerOrders: CustomerOrder[] = [];

  /**
   * Activates the order inquiry process after a customer name is entered.
   */
  askOrder(name?: string): void {
    if (name) {
      this.customerName = name;
    }
    if (this.customerName.trim()) {
      this.orderInquiryActive = true;
    }
  }

  /**
   * Handles beverage selection from BeverageSelectionComponent
   */
  onBeverageSelect(beverage: string): void {
    this.selectedBeverage = beverage;
  }

  /**
   * Resets form and inquiry state after an order has been placed.
   */
  onOrderPlaced(order: CustomerOrder): void {
    // Reset state for next customer
    this.customerName = '';
    this.selectedBeverage = '';
    this.orderInquiryActive = false;
  }

  /**
   * Fallback method to place order directly if needed
   */
  placeOrder(): void {
    if (this.customerName.trim() && this.selectedBeverage) {
      const trimmedName = this.customerName.trim();
      this.customerOrders.push({
        customerName: trimmedName,
        name: trimmedName,
        beverage: this.selectedBeverage
      });
      this.customerName = '';
      this.selectedBeverage = '';
      this.orderInquiryActive = false;
    }
  }
}
