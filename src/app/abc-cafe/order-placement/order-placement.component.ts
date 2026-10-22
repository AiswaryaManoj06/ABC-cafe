import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOrder } from '../../models/customer-order.model';

@Component({
  selector: 'app-order-placement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-placement.component.html',
  styleUrls: ['./order-placement.component.css']
})
export class OrderPlacementComponent {
  /** Name of the customer placing the order */
  @Input() customerName: string = '';

  /** Selected beverage to order */
  @Input() selectedBeverage: string = '';

  /** Reference to the order summary array */
  @Input() customerOrders: CustomerOrder[] = [];

  /** Emits the created order upon successful placement */
  @Output() orderPlaced = new EventEmitter<CustomerOrder>();

  /**
   * Implements the "Place Order" functionality:
   * Adds the selected beverage to the order summary array
   * and notifies parent component.
   */
  placeOrder(): void {
    if (this.customerName && this.customerName.trim() && this.selectedBeverage) {
      const trimmedName = this.customerName.trim();
      const newOrder: CustomerOrder = {
        customerName: trimmedName,
        name: trimmedName,
        beverage: this.selectedBeverage
      };

      // Add selected beverage to the order summary
      if (this.customerOrders) {
        this.customerOrders.push(newOrder);
      }

      // Notify parent component
      this.orderPlaced.emit(newOrder);
    }
  }
}
