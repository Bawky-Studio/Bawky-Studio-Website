import { NextRequest } from "next/server";

const PROD_BASE_URL = "https://www.bawkystudio.com";
const DEV_BASE_URL = "http://localhost:3000";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getAuthSecret(): string {
  return requireEnv("AUTH_SECRET");
}

export function getSteamAppId(): string {
  return requireEnv("STEAM_APP_ID");
}

export function getSteamWebApiKey(): string | null {
  return process.env.STEAM_WEB_API_KEY ?? null;
}

export function getExpectedBaseUrl(): string {
  return process.env.NODE_ENV === "production" ? PROD_BASE_URL : DEV_BASE_URL;
}

export function assertRequestOriginMatchesEnvironment(request: NextRequest): void {
  const expected = getExpectedBaseUrl();
  const actual = request.nextUrl.origin;
  if (actual !== expected) {
    throw new Error(
      `Invalid auth origin. expected=${expected} actual=${actual}`,
    );
  }
}

export function getSteamRealmAndReturnTo(request: NextRequest): {
  realm: string;
  returnTo: string;
} {
  assertRequestOriginMatchesEnvironment(request);
  const baseUrl = getExpectedBaseUrl();
  return {
    realm: baseUrl,
    returnTo: `${baseUrl}/api/auth/steam/callback`,
  };
}

export function getSteamWishlistUtmParams(): URLSearchParams {
  const params = new URLSearchParams();

  const source = process.env.STEAM_WISHLIST_UTM_SOURCE;
  const medium = process.env.STEAM_WISHLIST_UTM_MEDIUM;
  const campaign = process.env.STEAM_WISHLIST_UTM_CAMPAIGN;

  if (source) params.set("utm_source", source);
  if (medium) params.set("utm_medium", medium);
  if (campaign) params.set("utm_campaign", campaign);

  return params;
}
