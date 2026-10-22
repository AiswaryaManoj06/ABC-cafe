import { Injectable } from '@angular/core';

export interface FeedbackEntry {
  order: string;
  feedback: 'Good' | 'Average' | 'Poor' | string;
  timestamp: Date;
}

export interface ReviewStats {
  good: number;
  average: number;
  poor: number;
  Good: number;
  Average: number;
  Poor: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  /** Internal storage for logged feedback */
  private feedbackData: FeedbackEntry[] = [];

  /**
   * Log the feedback for a specific order.
   * @param order - The order description or identifier
   * @param feedback - The review rating ('Good', 'Average', 'Poor')
   */
  logFeedback(order: string, feedback: string): void {
    const entry: FeedbackEntry = {
      order,
      feedback,
      timestamp: new Date()
    };
    this.feedbackData.push(entry);
  }

  /**
   * Retrieve the complete list of feedback data entries.
   */
  getFeedbackData(): FeedbackEntry[] {
    return [...this.feedbackData];
  }

  /**
   * Calculate and return the count of Good, Average, and Poor reviews.
   */
  getReviewStats(): ReviewStats {
    let good = 0;
    let average = 0;
    let poor = 0;

    for (const item of this.feedbackData) {
      const rating = (item.feedback || '').trim().toLowerCase();
      if (rating === 'good') {
        good++;
      } else if (rating === 'average') {
        average++;
      } else if (rating === 'poor') {
        poor++;
      }
    }

    return {
      good,
      average,
      poor,
      Good: good,
      Average: average,
      Poor: poor,
      total: this.feedbackData.length
    };
  }

  /**
   * Determine and return a message about the overall performance based on reviews.
   * Categories: Excellent, Good, Needs improvement
   */
  getPerformanceMessage(): string {
    const stats = this.getReviewStats();
    const total = stats.total;

    if (total === 0) {
      return 'No reviews yet. Please collect customer feedback to assess performance.';
    }

    const goodRatio = stats.good / total;
    const positiveRatio = (stats.good + stats.average) / total;

    if (goodRatio >= 0.6) {
      return 'Excellent: Customers are exceptionally delighted with the cafe experience!';
    } else if (positiveRatio >= 0.6) {
      return 'Good: Satisfactory performance with consistent customer appreciation.';
    } else {
      return 'Needs improvement: Customer ratings indicate areas requiring immediate attention.';
    }
  }
}
