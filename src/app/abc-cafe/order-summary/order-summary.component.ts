import { Component, Input } from '@angular/core';
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
}
