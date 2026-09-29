const store = new Map<string, { count: number; resetAt: number }>();

export function consumeRateLimit(input: {
  key: string;
  limit: number;
  windowMs: number;
}): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const current = store.get(input.key);

  if (!current || current.resetAt <= now) {
    store.set(input.key, {
      count: 1,
      resetAt: now + input.windowMs,
    });
    return { allowed: true, retryAfterSec: Math.ceil(input.windowMs / 1000) };
  }

  if (current.count >= input.limit) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  store.set(input.key, current);
  return {
    allowed: true,
    retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}
