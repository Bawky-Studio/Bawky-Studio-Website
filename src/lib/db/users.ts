import { prisma } from "@/lib/db/prisma";
import { SteamProfile } from "@/lib/steam/profile";

export async function upsertUserBySteamId(input: {
  steamid: string;
  profile?: SteamProfile | null;
}) {
  const profile = input.profile ?? null;

  return prisma.user.upsert({
    where: { steamid: input.steamid },
    create: {
      steamid: input.steamid,
      personaName: profile?.personaname ?? null,
      profileUrl: profile?.profileurl ?? null,
      avatar: profile?.avatar ?? null,
      avatarMedium: profile?.avatarmedium ?? null,
      avatarFull: profile?.avatarfull ?? null,
      realName: profile?.realname ?? null,
      countryCode: profile?.loccountrycode ?? null,
      stateCode: profile?.locstatecode ?? null,
      cityId: profile?.loccityid ?? null,
      profileVisibilityState: profile?.profilestate ?? null,
      communityVisibilityState: profile?.communityvisibilitystate ?? null,
      accountCreatedAt: profile?.timecreated ?? null,
    },
    update: {
      personaName: profile?.personaname ?? undefined,
      profileUrl: profile?.profileurl ?? undefined,
      avatar: profile?.avatar ?? undefined,
      avatarMedium: profile?.avatarmedium ?? undefined,
      avatarFull: profile?.avatarfull ?? undefined,
      realName: profile?.realname ?? undefined,
      countryCode: profile?.loccountrycode ?? undefined,
      stateCode: profile?.locstatecode ?? undefined,
      cityId: profile?.loccityid ?? undefined,
      profileVisibilityState: profile?.profilestate ?? undefined,
      communityVisibilityState: profile?.communityvisibilitystate ?? undefined,
      accountCreatedAt: profile?.timecreated ?? undefined,
    },
  });
}

export async function findUserBySteamId(steamid: string) {
  return prisma.user.findUnique({ where: { steamid } });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}
