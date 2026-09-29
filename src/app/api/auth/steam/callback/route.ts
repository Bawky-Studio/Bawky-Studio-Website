import { NextRequest, NextResponse } from "next/server";
import { getExpectedBaseUrl, getSteamRealmAndReturnTo } from "@/lib/env";
import { SESSION_COOKIE_NAME, sessionStore } from "@/lib/auth/session-store";
import { upsertUserBySteamId } from "@/lib/db/users";
import { errorResponse } from "@/lib/http/errors";
import { fetchSteamProfile } from "@/lib/steam/profile";
import { parseSteamId64, verifySteamOpenId } from "@/lib/steam/openid";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  let returnTo: string;

  try {
    ({ returnTo } = getSteamRealmAndReturnTo(request));
  } catch {
    return errorResponse(
      "CONFIGURATION_ERROR",
      "Steam auth configuration is invalid for this environment.",
      500,
    );
  }

  const actualReturnTo = request.nextUrl.searchParams.get("openid.return_to");
  if (actualReturnTo !== returnTo) {
    return errorResponse(
      "CONFIGURATION_ERROR",
      "Steam return URL mismatch detected.",
      500,
    );
  }

  const verification = await verifySteamOpenId(request.nextUrl);
  if (!verification.ok || !verification.claimedId) {
    return errorResponse(
      "STEAM_VERIFICATION_FAILED",
      "Steam OpenID verification failed.",
      401,
    );
  }

  const steamid = parseSteamId64(verification.claimedId);
  if (!steamid) {
    return errorResponse(
      "STEAM_VERIFICATION_FAILED",
      "SteamID extraction failed.",
      401,
    );
  }

  try {
    const profile = await fetchSteamProfile(steamid);
    await upsertUserBySteamId({ steamid, profile });

    const { token, maxAgeSeconds } = sessionStore.create(steamid);
    const response = NextResponse.redirect(new URL("/", getExpectedBaseUrl()));

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: maxAgeSeconds,
    });

    return response;
  } catch {
    return errorResponse("INTERNAL_ERROR", "Failed to complete sign-in.", 500);
  }
}
