import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "BAD_REQUEST"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "CONFIGURATION_ERROR"
  | "STEAM_VERIFICATION_FAILED"
  | "INTERNAL_ERROR";

export function errorResponse(
  code: ApiErrorCode,
  message: string,
  status: number,
): NextResponse {
  return NextResponse.json(
    {
      error: {
        code,
        message,
      },
    },
    { status },
  );
}
