import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface UserReview {
  id: string;
  userId: string;
  displayName: string;
  rating: number; // 1 to 5
  reviewText: string;
  createdAt: Timestamp | Date | string | null;
  updatedAt?: Timestamp | Date | string | null;
  moderationStatus: 'approved' | 'pending' | 'rejected';
}

export interface ReviewSubmission {
  rating: number;
  reviewText: string;
}

export interface ReviewStats {
  averageRating: number | null;
  reviewCount: number;
}

/**
 * Fetch approved reviews for public display.
 * Returns genuine reviews stored in Firestore without fabricated entries.
 */
export async function getApprovedReviews(maxReviews = 20): Promise<UserReview[]> {
  try {
    const reviewsRef = collection(db, 'reviews');
    // Fetch approved reviews ordered by newest
    const q = query(
      reviewsRef,
      where('moderationStatus', '==', 'approved'),
      orderBy('createdAt', 'desc'),
      limit(maxReviews)
    );
    const snap = await getDocs(q);
    const reviews: UserReview[] = [];
    snap.forEach((docSnap) => {
      reviews.push({
        id: docSnap.id,
        ...(docSnap.data() as Omit<UserReview, 'id'>),
      });
    });
    return reviews;
  } catch (error) {
    console.warn('[Farmculture Reviews] Error fetching approved reviews:', error);
    // Return empty list gracefully if collection empty or indexes building
    return [];
  }
}

/**
 * Calculates genuine average rating and count from actual approved reviews.
 * No hardcoded 4.9/5 or artificial multipliers.
 */
export function computeReviewStats(reviews: UserReview[]): ReviewStats {
  if (!reviews || reviews.length === 0) {
    return { averageRating: null, reviewCount: 0 };
  }
  const valid = reviews.filter((r) => r.rating >= 1 && r.rating <= 5);
  if (valid.length === 0) {
    return { averageRating: null, reviewCount: 0 };
  }
  const sum = valid.reduce((acc, r) => acc + r.rating, 0);
  const avg = Math.round((sum / valid.length) * 10) / 10;
  return { averageRating: avg, reviewCount: valid.length };
}

/**
 * Submit a real user review linked strictly to authenticated user UID.
 */
export async function submitUserReview(
  userId: string,
  displayName: string,
  submission: ReviewSubmission
): Promise<{ success: boolean; reviewId?: string; error?: string }> {
  // Input validations
  if (!userId) {
    return { success: false, error: 'Authentication required to post a review.' };
  }
  if (!submission.rating || submission.rating < 1 || submission.rating > 5) {
    return { success: false, error: 'Rating must be between 1 and 5 stars.' };
  }
  const trimmed = (submission.reviewText || '').trim();
  if (trimmed.length < 5) {
    return { success: false, error: 'Review text must be at least 5 characters.' };
  }
  if (trimmed.length > 1000) {
    return { success: false, error: 'Review text cannot exceed 1,000 characters.' };
  }

  try {
    const reviewsRef = collection(db, 'reviews');
    const docRef = await addDoc(reviewsRef, {
      userId,
      displayName: displayName.trim() || 'Verified Farmer',
      rating: Math.floor(submission.rating),
      reviewText: trimmed,
      moderationStatus: 'approved', // Auto-approved for verified authenticated community members
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, reviewId: docRef.id };
  } catch (err: any) {
    console.error('[Farmculture Reviews] Review submission failed:', err);
    return { success: false, error: err.message || 'Failed to submit review. Try again.' };
  }
}
