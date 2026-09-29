import crypto from "crypto";
import { getAuthSecret } from "@/lib/env";

type SessionPayload = {
  sub: string;
  iat: number;
  exp: number;
};

const encoder = new TextEncoder();

function toBase64Url(input: string | Uint8Array): string {
  const raw = Buffer.from(input).toString("base64");
  return raw.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function fromBase64Url(input: string): string {
  const padded = input + "=".repeat((4 - (input.length % 4)) % 4);
  const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(base64, "base64").toString("utf8");
}

function sign(data: string, secret: string): string {
  return toBase64Url(
    crypto.createHmac("sha256", encoder.encode(secret)).update(data).digest(),
  );
}

export function createSessionToken(input: {
  steamid: string;
  maxAgeSeconds?: number;
}): string {
  const maxAgeSeconds = input.maxAgeSeconds ?? 60 * 60 * 24 * 7;
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: input.steamid,
    iat: now,
    exp: now + maxAgeSeconds,
  };

  const header = toBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = toBase64Url(JSON.stringify(payload));
  const data = `${header}.${body}`;
  const signature = sign(data, getAuthSecret());
  return `${data}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const [header, payload, signature] = parts;
  const expected = sign(`${header}.${payload}`, getAuthSecret());
  if (signature.length !== expected.length) {
    return null;
  }

  const valid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected),
  );

  if (!valid) {
    return null;
  }

  try {
    const data = JSON.parse(fromBase64Url(payload)) as SessionPayload;
    if (!data.sub || typeof data.exp !== "number") {
      return null;
    }

    const now = Math.floor(Date.now() / 1000);
    if (data.exp <= now) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}
