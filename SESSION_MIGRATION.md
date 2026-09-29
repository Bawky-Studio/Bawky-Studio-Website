# Session Migration Strategy (JWT -> DB Session Table)

This repository currently uses `sessionStore` with JWT cookies.

To migrate to DB-backed sessions safely:

1. Create a Prisma `Session` model with `id`, `userId`, `expiresAt`, and index on `id`.
2. Add `DbSessionStore` implementing the existing `SessionStore` interface in `src/lib/auth/session-store.ts`.
3. Switch `sessionStore` binding from `JwtSessionStore` to `DbSessionStore`.
4. Keep cookie name (`session`) and cookie flags unchanged.
5. Do not change Route Handler business logic; only session store internals should change.

Because protected APIs use `getAuthenticatedUser()` instead of reading JWT directly,
this migration is non-breaking for application routes.
