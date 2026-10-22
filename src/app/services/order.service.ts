import { Injectable } from '@angular/core';
import { CustomerOrder } from '../models/customer-order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  /** In-memory store of customer orders */
  private orders: CustomerOrder[] = [];

  /**
   * Retrieves all customer orders.
   */
  getOrders(): CustomerOrder[] {
    return this.orders;
  }

  /**
   * Adds a newly placed order to the shared store.
   */
  addOrder(order: CustomerOrder): void {
    this.orders.push(order);
  }

  /**
   * Marks an order as consumed with optional feedback.
   */
  markConsumed(order: CustomerOrder, feedback?: string): void {
    order.consumed = true;
    if (feedback) {
      order.feedback = feedback;
    }
  }
}
