import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { CustomerOrder } from '../../models/customer-order.model';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, UpperCasePipe],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  /** List of customer orders to display */
  @Input() customerOrders: CustomerOrder[] = [];

  /** Emitted when the "Consumed" button next to an order is clicked */
  @Output() orderConsumed = new EventEmitter<{ order: CustomerOrder; index: number }>();

  /**
   * Handles clicking the "Consumed" button for a specific order.
   */
  onConsumed(order: CustomerOrder, index: number): void {
    this.orderConsumed.emit({ order, index });
  }
}
