import { NextRequest, NextResponse } from "next/server";
import { getSteamRealmAndReturnTo } from "@/lib/env";
import { errorResponse } from "@/lib/http/errors";
import { buildSteamLoginUrl } from "@/lib/steam/openid";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { realm, returnTo } = getSteamRealmAndReturnTo(request);
    const location = buildSteamLoginUrl({ realm, returnTo });
    return NextResponse.redirect(location);
  } catch {
    return errorResponse(
      "CONFIGURATION_ERROR",
      "Steam auth configuration is invalid for this environment.",
      500,
    );
  }
}
