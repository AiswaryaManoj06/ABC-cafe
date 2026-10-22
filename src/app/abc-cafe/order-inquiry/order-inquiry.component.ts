import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-inquiry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-inquiry.component.html',
  styleUrls: ['./order-inquiry.component.css']
})
export class OrderInquiryComponent {
  /** Name of the customer being inquired */
  @Input() customerName: string = '';

  /** Returns the dynamic inquiry message replacing [customerName] */
  get inquiryMessage(): string {
    return `What would ${this.customerName ? this.customerName : 'customer'} like to have?`;
  }
}
