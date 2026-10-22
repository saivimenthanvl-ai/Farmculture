import { describe, it, expect } from 'vitest';
import {
  computeReviewStats,
  UserReview,
  submitUserReview,
} from '../lib/reviewService';

describe('P2 — Real User Ratings and Reviews System', () => {
  it('returns empty stats with averageRating null when no reviews exist', () => {
    const stats = computeReviewStats([]);
    expect(stats.averageRating).toBeNull();
    expect(stats.reviewCount).toBe(0);
  });

  it('computes accurate average and count without hardcoding or inflated metrics', () => {
    const sampleReviews: UserReview[] = [
      {
        id: 'rev-1',
        userId: 'user-1',
        displayName: 'Ramesh Patel',
        rating: 5,
        reviewText: 'Mandi prices update quickly and accurately for our potato crop.',
        createdAt: '2026-10-20T10:00:00Z',
        moderationStatus: 'approved',
      },
      {
        id: 'rev-2',
        userId: 'user-2',
        displayName: 'Sita Devi',
        rating: 4,
        reviewText: 'Weather insights helped us delay irrigation before heavy rain.',
        createdAt: '2026-10-20T11:00:00Z',
        moderationStatus: 'approved',
      },
    ];

    const stats = computeReviewStats(sampleReviews);
    expect(stats.reviewCount).toBe(2);
    expect(stats.averageRating).toBe(4.5); // (5 + 4) / 2 = 4.5
  });

  it('validates review submissions rigorously to prevent spam and invalid ratings', async () => {
    // Missing user
    const noUser = await submitUserReview('', 'Farmer', { rating: 5, reviewText: 'Great app' });
    expect(noUser.success).toBe(false);
    expect(noUser.error).toContain('Authentication required');

    // Invalid rating (> 5)
    const highRating = await submitUserReview('uid-123', 'Farmer', { rating: 6, reviewText: 'Great app' });
    expect(highRating.success).toBe(false);
    expect(highRating.error).toContain('Rating must be between 1 and 5');

    // Invalid rating (< 1)
    const lowRating = await submitUserReview('uid-123', 'Farmer', { rating: 0, reviewText: 'Great app' });
    expect(lowRating.success).toBe(false);

    // Too short review text (< 5 chars)
    const shortText = await submitUserReview('uid-123', 'Farmer', { rating: 5, reviewText: 'Hi' });
    expect(shortText.success).toBe(false);
    expect(shortText.error).toContain('at least 5 characters');
  });
});
