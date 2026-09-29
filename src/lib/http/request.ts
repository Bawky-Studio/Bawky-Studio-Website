import { NextRequest } from "next/server";

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim().replace(/^::ffff:/, "");
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.replace(/^::ffff:/, "");
  }

  return "unknown";
}
