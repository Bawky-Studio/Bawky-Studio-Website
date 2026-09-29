import { getSteamWebApiKey } from "@/lib/env";

export type SteamProfile = {
  personaname?: string;
  profileurl?: string;
  avatar?: string;
  avatarmedium?: string;
  avatarfull?: string;
  realname?: string;
  loccountrycode?: string;
  locstatecode?: string;
  loccityid?: number;
  profilestate?: number;
  communityvisibilitystate?: number;
  timecreated?: number;
};

export async function fetchSteamProfile(
  steamId: string,
): Promise<SteamProfile | null> {
  const apiKey = getSteamWebApiKey();
  if (!apiKey) {
    return null;
  }

  try {
    const endpoint = new URL(
      "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/",
    );
    endpoint.searchParams.set("key", apiKey);
    endpoint.searchParams.set("steamids", steamId);

    const response = await fetch(endpoint.toString(), {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      response?: { players?: SteamProfile[] };
    };

    const player = data.response?.players?.[0];
    return player ?? null;
  } catch {
    return null;
  }
}
