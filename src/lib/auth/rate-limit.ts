import { NextRequest } from "next/server";
import { getClientIp } from "@/lib/http/request";
import { consumeRateLimit } from "@/lib/security/rate-limit";

export function enforceWriteRateLimit(
  request: NextRequest,
  action: "community-post" | "notice-comment",
): { allowed: boolean; retryAfterSec: number } {
  const ip = getClientIp(request);
  return consumeRateLimit({
    key: `${action}:${ip}`,
    limit: 10,
    windowMs: 60_000,
  });
}
