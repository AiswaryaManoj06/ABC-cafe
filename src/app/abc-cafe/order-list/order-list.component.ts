import { Component, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomerOrder } from '../../models/customer-order.model';
import { OrderService } from '../../services/order.service';
import { CustomerReviewComponent } from '../customer-review/customer-review.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, UpperCasePipe, RouterLink, CustomerReviewComponent],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  /** Reference to orders array from shared OrderService */
  customerOrders: CustomerOrder[] = [];

  /** Currently selected order for customer review */
  activeReviewOrder: CustomerOrder | null = null;
  activeOrderDescription: string = '';
  showCustomerReview: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.customerOrders = this.orderService.getOrders();
  }

  /**
   * Triggered when the "Consumed" button next to an order is clicked.
   * Displays CustomerReviewComponent for the consumed order.
   */
  onConsumed(order: CustomerOrder, index: number): void {
    this.activeReviewOrder = order;
    this.activeOrderDescription = `${order.customerName || order.name} - ${order.beverage}`;
    this.showCustomerReview = true;
  }

  /**
   * Handles review submission: marks order as consumed, hiding the Consumed button,
   * and hides the review component.
   */
  onReviewSubmitted(event: { order: string; feedback: string }): void {
    if (this.activeReviewOrder) {
      this.orderService.markConsumed(this.activeReviewOrder, event.feedback);
    }
    this.showCustomerReview = false;
    this.activeReviewOrder = null;
    this.activeOrderDescription = '';
  }
}
