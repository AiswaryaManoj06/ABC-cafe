import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService, ReviewStats } from '../../services/feedback.service';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  /** Review statistics from FeedbackService */
  reviewStats: ReviewStats = {
    good: 0,
    average: 0,
    poor: 0,
    Good: 0,
    Average: 0,
    Poor: 0,
    total: 0
  };

  /** Overall performance message from FeedbackService */
  performanceMessage: string = '';

  /** Controls visibility of the review status counts */
  showCounts: boolean = false;

  /** Event emitted when close button is pressed */
  @Output() close = new EventEmitter<void>();

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.refreshData();
  }

  /**
   * Retrieves data from FeedbackService to display review statistics and performance messages.
   */
  refreshData(): void {
    this.reviewStats = this.feedbackService.getReviewStats();
    this.performanceMessage = this.feedbackService.getPerformanceMessage();
  }

  /**
   * On button click shows the count of each review status (Good, Average, Poor).
   */
  toggleReviewCounts(): void {
    this.refreshData();
    this.showCounts = !this.showCounts;
  }

  /**
   * Closes / hides the Performance Component.
   */
  onClose(): void {
    this.close.emit();
  }
}
