import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CustomerOrder {
  customerName: string;
  name: string;
  beverage: string;
}

@Component({
  selector: 'app-abc-cafe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abc-cafe.component.html',
  styleUrls: ['./abc-cafe.component.css']
})
export class AbcCafeComponent {
  /** Customer's name entered in the input field */
  customerName = '';

  /** Flag indicating the order inquiry is active */
  orderInquiryActive = false;

  /** Currently selected beverage */
  selectedBeverage = '';

  /** List of beverage options */
  beverages = ['Coffee', 'Tea', 'Juice', 'Soda'];

  /** Accumulated orders */
  customerOrders: CustomerOrder[] = [];

  /** Triggered when the "Ask Order" button is pressed */
  askOrder() {
    if (this.customerName.trim()) {
      // Show the beverage list only after customer name is entered
      this.orderInquiryActive = true;
    }
  }

  /** Adds the selected beverage to the order summary */
  placeOrder() {
    if (this.customerName.trim() && this.selectedBeverage) {
      this.customerOrders.push({
        customerName: this.customerName.trim(),
        name: this.customerName.trim(),
        beverage: this.selectedBeverage,
      });
      // Reset UI for the next order
      this.customerName = '';
      this.selectedBeverage = '';
      this.orderInquiryActive = false;
    }
  }
}
