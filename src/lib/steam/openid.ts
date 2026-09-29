const STEAM_OPENID_ENDPOINT = "https://steamcommunity.com/openid/login";

export function buildSteamLoginUrl(input: {
  realm: string;
  returnTo: string;
}): string {
  const params = new URLSearchParams({
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.mode": "checkid_setup",
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.return_to": input.returnTo,
    "openid.realm": input.realm,
  });

  return `${STEAM_OPENID_ENDPOINT}?${params.toString()}`;
}

export async function verifySteamOpenId(
  callbackUrl: URL,
): Promise<{ ok: boolean; claimedId: string | null }> {
  const params = new URLSearchParams(callbackUrl.search);
  params.set("openid.mode", "check_authentication");

  const response = await fetch(STEAM_OPENID_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    return { ok: false, claimedId: null };
  }

  const text = await response.text();
  const ok = text.includes("is_valid:true");
  const claimedId = callbackUrl.searchParams.get("openid.claimed_id");
  return { ok, claimedId };
}

export function parseSteamId64(claimedId: string): string | null {
  const match = claimedId.match(
    /^https:\/\/steamcommunity\.com\/openid\/id\/(\d{17})\/?$/,
  );
  return match ? match[1] : null;
}
