/**
 * Farmculture AI — Standardized Internationalization & Formatting Utilities
 *
 * Implements standard browser Intl APIs:
 * - Intl.DateTimeFormat (localized dates)
 * - Intl.RelativeTimeFormat (e.g. "2 hours ago", "yesterday")
 * - Intl.NumberFormat (INR currency, lakh/crore Indian grouping)
 * - Intl.PluralRules (cardinal plurals for issues, scans, items)
 */

export type FormatLocale = "en-IN" | "hi-IN" | "ta-IN" | "te-IN" | "mr-IN" | string;

/**
 * Format a Date or ISO timestamp according to locale standards
 */
export function formatDate(
  dateInput: string | number | Date,
  locale: FormatLocale = "en-IN",
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }
): string {
  try {
    const d = typeof dateInput === "string" || typeof dateInput === "number" ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return String(dateInput);
    return new Intl.DateTimeFormat(locale, options).format(d);
  } catch {
    return String(dateInput);
  }
}

/**
 * Format relative time using Intl.RelativeTimeFormat (e.g., 2 hours ago, 1 day ago)
 */
export function formatRelativeTime(
  dateInput: string | number | Date,
  locale: FormatLocale = "en-IN"
): string {
  try {
    const d = typeof dateInput === "string" || typeof dateInput === "number" ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return "just now";

    const now = Date.now();
    const elapsedSeconds = Math.round((d.getTime() - now) / 1000);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    const cutoffs = [
      { unit: "year", seconds: 31536000 },
      { unit: "month", seconds: 2592000 },
      { unit: "day", seconds: 86400 },
      { unit: "hour", seconds: 3600 },
      { unit: "minute", seconds: 60 },
      { unit: "second", seconds: 1 },
    ] as const;

    for (const { unit, seconds } of cutoffs) {
      if (Math.abs(elapsedSeconds) >= seconds || unit === "second") {
        const count = Math.round(elapsedSeconds / seconds);
        return rtf.format(count, unit);
      }
    }

    return rtf.format(0, "second");
  } catch {
    return "recently";
  }
}

/**
 * Format currency with Indian Lakh/Crore grouping or target locale grouping
 */
export function formatCurrencyINR(
  amount: number,
  locale: FormatLocale = "en-IN",
  currency: string = "INR",
  maximumFractionDigits: number = 0
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits,
    }).format(amount);
  } catch {
    return `₹${amount.toLocaleString()}`;
  }
}

/**
 * Format compact numbers (e.g. 1.2 Lakh, 2.5 Cr in Indian system)
 */
export function formatCompactNumber(
  value: number,
  locale: FormatLocale = "en-IN"
): string {
  try {
    return new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  } catch {
    return String(value);
  }
}

/**
 * Pluralize localized strings cleanly using Intl.PluralRules
 * Eliminates awkward camelCase string concatenation ("1 issuesFound")
 */
export function pluralizeIssues(
  count: number,
  locale: FormatLocale = "en-IN",
  labels: {
    one: string;
    other: string;
    zero?: string;
  } = {
    one: "issue flagged",
    other: "issues flagged",
    zero: "no issues flagged",
  }
): string {
  try {
    if (count === 0 && labels.zero) return labels.zero;
    const pr = new Intl.PluralRules(locale);
    const category = pr.select(count);
    const suffix = category === "one" ? labels.one : labels.other;
    return `${count} ${suffix}`;
  } catch {
    return `${count} ${count === 1 ? labels.one : labels.other}`;
  }
}
