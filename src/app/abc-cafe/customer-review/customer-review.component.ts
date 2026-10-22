import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-customer-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css']
})
export class CustomerReviewComponent {
  /** The specific order being reviewed (defaults to last order context) */
  @Input() order: string = '';

  /** Controls whether the review component is visible */
  @Input() isVisible: boolean = true;

  /** Two-way binding for visibility */
  @Output() isVisibleChange = new EventEmitter<boolean>();

  /** Emitted when review has been submitted */
  @Output() reviewSubmitted = new EventEmitter<{ order: string; feedback: string }>();

  constructor(private feedbackService: FeedbackService) {}

  /**
   * Submits review (Good, Average, or Poor) for the specified order
   * to the shared FeedbackService and hides the review component.
   */
  submitReview(rating: 'Good' | 'Average' | 'Poor'): void {
    const orderDescription = this.order || 'Last Order';

    // Submit to shared FeedbackService
    this.feedbackService.logFeedback(orderDescription, rating);

    // Notify listeners
    this.reviewSubmitted.emit({
      order: orderDescription,
      feedback: rating
    });

    // Hide component after submitting review
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }

  /**
   * Cancels / dismisses the review prompt.
   */
  dismiss(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }
}
