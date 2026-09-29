import { NextRequest, NextResponse } from "next/server";
import { getSteamAppId, getSteamWishlistUtmParams } from "@/lib/env";
import { errorResponse } from "@/lib/http/errors";

export async function GET(_request: NextRequest) {
  try {
    const appId = getSteamAppId();
    const url = new URL(`https://store.steampowered.com/app/${appId}/`);

    const utmParams = getSteamWishlistUtmParams();
    for (const [key, value] of utmParams.entries()) {
      url.searchParams.set(key, value);
    }

    return NextResponse.redirect(url);
  } catch {
    return errorResponse(
      "CONFIGURATION_ERROR",
      "Steam App ID is not configured.",
      500,
    );
  }
}
