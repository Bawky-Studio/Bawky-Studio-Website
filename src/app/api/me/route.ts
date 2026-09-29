import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth/server-session";
import { errorResponse } from "@/lib/http/errors";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return errorResponse("UNAUTHORIZED", "Authentication is required.", 401);
    }

    return NextResponse.json({
      user: {
        id: user.id,
        steamid: user.steamid,
        personaName: user.personaName,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    });
  } catch {
    return errorResponse("INTERNAL_ERROR", "Failed to load user session.", 500);
  }
}
