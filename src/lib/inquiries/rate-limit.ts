type RateBucket = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 6;
const buckets = new Map<string, RateBucket>();

export function checkInquiryRateLimit(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(Math.ceil((bucket.resetAt - now) / 1000), 1),
    };
  }

  bucket.count += 1;
  return { ok: true, retryAfterSeconds: 0 };
}

const processedSubmissions = new Map<string, number>();
const PROCESSED_TTL_MS = 30 * 60 * 1000;

export function wasSubmissionProcessed(submissionId: string) {
  const now = Date.now();
  for (const [id, expiresAt] of Array.from(processedSubmissions.entries())) {
    if (expiresAt <= now) processedSubmissions.delete(id);
  }
  return processedSubmissions.has(submissionId);
}

export function markSubmissionProcessed(submissionId: string) {
  processedSubmissions.set(submissionId, Date.now() + PROCESSED_TTL_MS);
}
