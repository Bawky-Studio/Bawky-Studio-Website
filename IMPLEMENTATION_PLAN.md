# IMPLEMENTATION_PLAN.md
Project: BawkyStudio
Scope: Steam OpenID Login + JWT Session + Supabase(Postgres)+Prisma + Community/Comments + Wishlist Link

This document defines the execution roadmap for implementing
authentication and protected APIs, based on AGENTS.md.

It describes:
- Execution order
- Milestones
- Acceptance criteria
- Dependency flow

It does NOT redefine architecture rules.
All architectural constraints are defined in AGENTS.md.

================================================================
PHASE 0 — PROJECT BASELINE & INFRASTRUCTURE
================================================================

Goal:
Prepare database connectivity, environment configuration,
and ensure the project structure aligns with AGENTS.md.

Steps:
- Confirm Next.js App Router usage.
- Confirm Route Handler structure exists.
- Setup Prisma with Supabase Postgres.
- Add initial Prisma schema (User model minimum).
- Configure environment variables.
- Create `.env.example`.

Dependencies:
None

Acceptance Criteria:
- `pnpm dev` runs without error.
- Prisma successfully connects to Supabase.
- `prisma migrate dev` works locally.
- No production secrets committed.

Milestone:
Backend infrastructure ready for authentication.

================================================================
PHASE 1 — STEAM AUTHENTICATION (OpenID 2.0)
================================================================

Goal:
Implement Steam login flow that securely identifies user via SteamID64.

Steps:
- Implement login start endpoint (redirect to Steam).
- Implement return endpoint (verify OpenID assertion).
- Extract SteamID64 from claimed_id.
- Fail safely if verification fails.
- Upsert user record by steamid (minimal fields only).

Dependencies:
Phase 0 completed.

Acceptance Criteria:
- Visiting auth endpoint redirects to Steam login.
- Successful login returns to site.
- steamid stored in database.
- Duplicate logins do not create duplicate users.

Milestone:
System can securely identify users via Steam.

================================================================
PHASE 2 — JWT SESSION LAYER
================================================================

Goal:
Persist authentication state using httpOnly cookie (JWT).

Steps:
- Implement JWT sign/verify utilities.
- Set secure httpOnly cookie in return route.
- Implement session extraction helper.
- Implement `/api/me` endpoint.

Dependencies:
Phase 1 completed.

Acceptance Criteria:
- Cookie named `session` is set after login.
- `/api/me` returns user when logged in.
- `/api/me` returns 401 when not logged in.
- JWT is not accessible via client-side JS.

Milestone:
Authentication state maintained securely.

================================================================
PHASE 3 — STEAM PROFILE ENRICHMENT
================================================================

Goal:
Store maximum available Steam profile data if API key is configured.

Steps:
- Integrate Steam Web API (GetPlayerSummaries).
- Expand Prisma schema to store nullable profile fields.
- Fetch profile after login.
- Update user record safely.
- Ensure enrichment failure does not break login.

Dependencies:
Phase 2 completed.

Acceptance Criteria:
- When STEAM_WEB_API_KEY exists, profile fields populate.
- When API key is missing or API fails, login still succeeds.
- Database schema remains migration-safe.

Milestone:
User profiles enriched with Steam metadata.

================================================================
PHASE 4 — COMMUNITY POSTS (Protected Write)
================================================================

Goal:
Allow authenticated users to create community posts.

Steps:
- Define CommunityPost Prisma model.
- Implement GET endpoint (public).
- Implement POST endpoint (auth required).
- Add input validation.
- Associate post with user ID.

Dependencies:
Phase 2 completed.

Acceptance Criteria:
- Unauthenticated POST returns 401.
- Authenticated POST creates DB record.
- GET endpoint publicly lists posts.

Milestone:
Authenticated content creation enabled.

================================================================
PHASE 5 — NOTICE COMMENTS (Protected Write)
================================================================

Goal:
Allow authenticated users to comment on notices.

Steps:
- Define NoticeComment Prisma model.
- Implement GET endpoint (public).
- Implement POST endpoint (auth required).
- Validate input.
- Index by noticeId.

Dependencies:
Phase 2 completed.

Acceptance Criteria:
- Unauthenticated POST returns 401.
- Authenticated POST creates comment record.
- Comments retrievable by noticeId.

Milestone:
Authenticated comment system functional.

================================================================
PHASE 6 — STEAM WISHLIST LINK
================================================================

Goal:
Provide configurable Steam store link.

Steps:
- Use STEAM_APP_ID from environment.
- Construct Steam Store URL.
- Optionally append UTM parameters.
- Add link/button to relevant UI location.

Dependencies:
None (independent of auth).

Acceptance Criteria:
- Link opens correct Steam Store page.
- AppID configurable without code change.

Milestone:
Wishlist traffic flow established.

================================================================
PHASE 7 — HARDENING & PRODUCTION SAFETY
================================================================

Goal:
Prepare system for production stability.

Steps:
- Implement rate limiting on POST endpoints.
- Standardize error response format.
- Verify cookie flags (Secure in prod).
- Ensure no secret exposure.
- Verify domain-specific Steam realm/return behavior.

Dependencies:
All previous phases.

Acceptance Criteria:
- Excessive POST requests return 429.
- API error responses follow standard format.
- Production login works with correct domain.
- Cookies correctly configured in prod.

Milestone:
Production-ready authentication and write APIs.

================================================================
PHASE 8 — FUTURE MIGRATION PATH (Non-Blocking)
================================================================

Goal:
Prepare for optional JWT → session table migration.

Steps:
- Abstract session retrieval logic.
- Ensure business logic does not depend directly on JWT payload.
- Document migration strategy.

Dependencies:
Phase 2 completed.

Acceptance Criteria:
- Session implementation can be swapped without refactoring APIs.

Milestone:
Architecture future-proofed.

================================================================
END OF IMPLEMENTATION PLAN
================================================================
