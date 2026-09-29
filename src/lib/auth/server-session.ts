import { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, sessionStore } from "@/lib/auth/session-store";
import { findUserBySteamId } from "@/lib/db/users";

export async function getSessionFromRequest(request: NextRequest) {
  const raw = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!raw) {
    return null;
  }

  return sessionStore.read(raw);
}

export async function getAuthenticatedUser(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return null;
  }

  return findUserBySteamId(session.steamid);
}
