import { createSessionToken, verifySessionToken } from "@/lib/auth/jwt";

export const SESSION_COOKIE_NAME = "session";
const DEFAULT_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export type SessionRecord = {
  steamid: string;
  expiresAt: Date;
};

export interface SessionStore {
  create(steamid: string): { token: string; maxAgeSeconds: number };
  read(token: string): SessionRecord | null;
}

class JwtSessionStore implements SessionStore {
  create(steamid: string): { token: string; maxAgeSeconds: number } {
    const maxAgeSeconds = DEFAULT_SESSION_MAX_AGE_SECONDS;
    const token = createSessionToken({ steamid, maxAgeSeconds });
    return { token, maxAgeSeconds };
  }

  read(token: string): SessionRecord | null {
    const payload = verifySessionToken(token);
    if (!payload) {
      return null;
    }

    return {
      steamid: payload.sub,
      expiresAt: new Date(payload.exp * 1000),
    };
  }
}

// Keep the session store behind an interface so JWT can be replaced
// with a DB-backed session table without touching API business logic.
export const sessionStore: SessionStore = new JwtSessionStore();
