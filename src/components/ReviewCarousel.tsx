import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  X,
  User,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  UserReview,
  getApprovedReviews,
  computeReviewStats,
  submitUserReview,
} from "@/lib/reviewService";

export const ReviewCarousel: React.FC = () => {
  const { user, friendlyName } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Modal form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Swipe gesture tracking
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Fetch approved reviews on mount
  const loadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getApprovedReviews(25);
      setReviews(data);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // Derived genuine statistics
  const stats = computeReviewStats(reviews);

  // Auto-advancement every 5 seconds (only when > 1 review and not paused)
  useEffect(() => {
    if (reviews.length <= 1 || isPaused) return;

    // Respect reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length, isPaused]);

  const handlePrev = () => {
    if (reviews.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    if (reviews.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Submission handler
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth/login?returnTo=/");
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    const displayName = friendlyName || user.displayName || user.email?.split("@")[0] || "Farmer";
    const res = await submitUserReview(user.uid, displayName, {
      rating,
      reviewText,
    });

    setSubmitting(false);

    if (res.success) {
      setFeedback({
        type: "success",
        message: "Your review has been submitted and published. Thank you for your feedback!",
      });
      setReviewText("");
      setRating(5);
      // Reload reviews to reflect addition
      await loadReviews();
      setTimeout(() => {
        setIsModalOpen(false);
        setFeedback(null);
      }, 1500);
    } else {
      setFeedback({
        type: "error",
        message: res.error || "Failed to post review. Please check requirements.",
      });
    }
  };

  return (
    <section
      aria-label="Community Ratings & Reviews"
      className="my-16 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>{t("reviews.badge")}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t("reviews.title")}</h2>
            <p className="text-xs text-gray-500 mt-1">
              {t("reviews.subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Stats Badge */}
            {stats.reviewCount > 0 && stats.averageRating !== null ? (
              <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="font-bold text-sm text-gray-900">{stats.averageRating} / 5</span>
                <span className="text-xs text-gray-500">
                  ({t("reviews.basedOn") || "Based on"} {stats.reviewCount} {t("reviews.countLabel") || "reviews"})
                </span>
              </div>
            ) : null}

            {/* Write a Review Button */}
            {user ? (
              <button
                onClick={() => {
                  setFeedback(null);
                  setIsModalOpen(true);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t("reviews.writeReview")}</span>
              </button>
            ) : (
              <Link
                to="/auth/login?returnTo=/"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t("reviews.signInToReview")}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Carousel Area */}
        {loading ? (
          <div className="h-44 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          /* Empty State Requirement: "No reviews yet. Be the first to share your experience." */
          <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              {t("reviews.noReviewsYet")}
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
              {t("reviews.noReviewsSubtitle")}
            </p>
            {user ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
              >
                {t("reviews.submitFirstReview")}
              </button>
            ) : (
              <Link
                to="/auth/login?returnTo=/"
                className="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
              >
                {t("reviews.signInToLeave")}
              </Link>
            )}
          </div>
        ) : (
          /* Carousel of genuine reviews */
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Active Card */}
            <div className="overflow-hidden min-h-[160px] flex items-center">
              <div
                key={reviews[currentIndex]?.id || currentIndex}
                className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl p-6 transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      {reviews[currentIndex]?.displayName?.charAt(0).toUpperCase() || "F"}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {reviews[currentIndex]?.displayName || "Farmer"}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Verified Community Member</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= (reviews[currentIndex]?.rating || 5)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "{reviews[currentIndex]?.reviewText}"
                </p>
              </div>
            </div>

            {/* Navigation Controls (Only if > 1 review) */}
            {reviews.length > 1 && (
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors focus:ring-2 focus:ring-emerald-400"
                  aria-label={t("reviews.previousReview") || "Previous review"}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        i === currentIndex ? "w-6 bg-emerald-600" : "w-1.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`${t("reviews.title")} ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors focus:ring-2 focus:ring-emerald-400"
                  aria-label={t("reviews.nextReview") || "Next review"}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modal: Write a Review Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">{t("reviews.modalTitle")}</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {feedback && (
                <div
                  className={`my-3 p-3 rounded-lg text-xs flex items-start gap-2 ${
                    feedback.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {feedback.type === "success" ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    {t("reviews.overallRating")}
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-200"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-medium text-gray-500 ml-2">
                      {hoverRating || rating} / 5
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t("reviews.yourReview")}
                  </label>
                  <textarea
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={t("reviews.placeholder")}
                    required
                    minLength={5}
                    maxLength={1000}
                    className="w-full px-3 py-2 border rounded-lg text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 border-gray-200"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>{t("reviews.minCharacters")}</span>
                    <span>{reviewText.length} / 1000</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3.5 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    {t("reviews.cancel")}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || reviewText.trim().length < 5}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                  >
                    {submitting ? t("reviews.posting") : t("reviews.submitReview")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewCarousel;
