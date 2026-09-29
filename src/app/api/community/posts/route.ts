import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth/server-session";
import { enforceWriteRateLimit } from "@/lib/auth/rate-limit";
import { validatePostInput } from "@/lib/auth/validation";
import { createCommunityPost, listCommunityPosts } from "@/lib/db/community-posts";
import { errorResponse } from "@/lib/http/errors";

export async function GET() {
  try {
    const posts = await listCommunityPosts();
    return NextResponse.json({ posts });
  } catch {
    return errorResponse("INTERNAL_ERROR", "Failed to load posts.", 500);
  }
}

export async function POST(request: NextRequest) {
  const rate = enforceWriteRateLimit(request, "community-post");
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

  const user = await getAuthenticatedUser(request);
  if (!user) {
    return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
  }

  const body = await request.json().catch(() => null);
  const validated = validatePostInput(body);

  if (!validated.ok) {
    return errorResponse("BAD_REQUEST", validated.message, 400);
  }

  try {
    const post = await createCommunityPost({
      authorId: user.id,
      title: validated.title,
      content: validated.content,
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch {
    return errorResponse("INTERNAL_ERROR", "Failed to create post.", 500);
  }
}
