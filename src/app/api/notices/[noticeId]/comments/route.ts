import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth/server-session";
import { enforceWriteRateLimit } from "@/lib/auth/rate-limit";
import { validateNoticeCommentInput } from "@/lib/auth/validation";
import { createNoticeComment, listNoticeComments } from "@/lib/db/notice-comments";
import { errorResponse } from "@/lib/http/errors";

function validateNoticeId(noticeId: string): boolean {
  return /^[a-zA-Z0-9-]{1,200}$/.test(noticeId);
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ noticeId: string }> },
) {
  const { noticeId } = await context.params;
  if (!validateNoticeId(noticeId)) {
    return errorResponse("BAD_REQUEST", "Invalid noticeId.", 400);
  }

  try {
    const comments = await listNoticeComments(noticeId);
    return NextResponse.json({ comments });
  } catch {
    return errorResponse("INTERNAL_ERROR", "Failed to load comments.", 500);
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ noticeId: string }> },
) {
  const rate = enforceWriteRateLimit(request, "notice-comment");
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: {
          code: "RATE_LIMITED",
          message: "Too many requests. Please try again later.",
        },
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rate.retryAfterSec),
        },
      },
    );
  }

  const { noticeId } = await context.params;
  if (!validateNoticeId(noticeId)) {
    return errorResponse("BAD_REQUEST", "Invalid noticeId.", 400);
  }

  const user = await getAuthenticatedUser(request);
  if (!user) {
    return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  }

  const body = await request.json().catch(() => null);
  const validated = validateNoticeCommentInput(body);

  if (!validated.ok) {
    return errorResponse("BAD_REQUEST", validated.message, 400);
  }

  try {
    const comment = await createNoticeComment({
      noticeId,
      authorId: user.id,
      content: validated.content,
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch {
    return errorResponse("INTERNAL_ERROR", "Failed to create comment.", 500);
  }
}
