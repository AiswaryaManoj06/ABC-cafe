import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerOrder } from '../models/customer-order.model';
import { CounterComponent } from './counter/counter.component';
import { OrderInquiryComponent } from './order-inquiry/order-inquiry.component';
import { BeverageSelectionComponent } from './beverage-selection/beverage-selection.component';
import { OrderPlacementComponent } from './order-placement/order-placement.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CustomerReviewComponent } from './customer-review/customer-review.component';
import { PerformanceComponent } from './performance/performance.component';

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
    OrderSummaryComponent,
    CustomerReviewComponent,
    PerformanceComponent
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

  /** Flag to toggle visibility of PerformanceComponent */
  showPerformance: boolean = false;

  /** Flag to toggle visibility of CustomerReviewComponent */
  showCustomerReview: boolean = false;

  /** Reference to order currently being reviewed */
  activeReviewOrder: CustomerOrder | null = null;

  /** Formatted description of order currently being reviewed */
  activeOrderDescription: string = '';

  /**
   * Returns formatted summary of the last placed order.
   */
  get lastOrderDescription(): string {
    if (this.customerOrders.length > 0) {
      const last = this.customerOrders[this.customerOrders.length - 1];
      return `${last.customerName || last.name} (${last.beverage})`;
    }
    return '';
  }

  /**
   * Activates the order inquiry process after customer name is entered.
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
   * Handles beverage selection from BeverageSelectionComponent.
   */
  onBeverageSelect(beverage: string): void {
    this.selectedBeverage = beverage;
  }

  /**
   * Resets form and inquiry state after an order has been placed.
   */
  onOrderPlaced(order: CustomerOrder): void {
    this.customerName = '';
    this.selectedBeverage = '';
    this.orderInquiryActive = false;
  }

  /**
   * Handles clicking the "Consumed" button on an order in the order list.
   * Displays CustomerReviewComponent for the consumed order.
   */
  onOrderConsumed(event: { order: CustomerOrder; index: number }): void {
    this.activeReviewOrder = event.order;
    this.activeOrderDescription = `${event.order.customerName || event.order.name} - ${event.order.beverage}`;
    this.showCustomerReview = true;
  }

  /**
   * Handles review submission: hides CustomerReviewComponent and marks the order
   * as consumed so its "Consumed" button is no longer visible.
   */
  onReviewSubmitted(event: { order: string; feedback: string }): void {
    if (this.activeReviewOrder) {
      this.activeReviewOrder.consumed = true;
      this.activeReviewOrder.feedback = event.feedback;
    } else if (this.customerOrders.length > 0) {
      // Fallback: apply to last order
      const last = this.customerOrders[this.customerOrders.length - 1];
      last.consumed = true;
      last.feedback = event.feedback;
    }

    this.showCustomerReview = false;
    this.activeReviewOrder = null;
    this.activeOrderDescription = '';
  }

  /**
   * Toggles visibility of the PerformanceComponent.
   */
  togglePerformance(): void {
    this.showPerformance = !this.showPerformance;
  }

  /**
   * Fallback method to place order directly if needed.
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
