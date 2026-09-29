-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('NOTICE', 'BLOG', 'DEVLOG', 'COMMUNITY');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'HIDDEN', 'DELETED');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "steamid" TEXT NOT NULL,
    "personaName" TEXT,
    "profileUrl" TEXT,
    "avatar" TEXT,
    "avatarMedium" TEXT,
    "avatarFull" TEXT,
    "realName" TEXT,
    "countryCode" VARCHAR(2),
    "stateCode" VARCHAR(10),
    "cityId" INTEGER,
    "profileVisibilityState" INTEGER,
    "communityVisibilityState" INTEGER,
    "personaState" INTEGER,
    "primaryClanId" TEXT,
    "gameId" TEXT,
    "gameExtraInfo" TEXT,
    "accountCreatedAt" TIMESTAMP(3),
    "lastLogoffAt" TIMESTAMP(3),
    "steamProfileUpdatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL,
    "type" "PostType" NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "slug" VARCHAR(140),
    "title" VARCHAR(140) NOT NULL,
    "content" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "editedAt" TIMESTAMP(3),
    "authorId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "postId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "editedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_steamid_key" ON "User"("steamid");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_type_status_publishedAt_idx" ON "Post"("type", "status", "publishedAt");

-- CreateIndex
CREATE INDEX "Post_type_createdAt_idx" ON "Post"("type", "createdAt");

-- CreateIndex
CREATE INDEX "Post_authorId_createdAt_idx" ON "Post"("authorId", "createdAt");

-- CreateIndex
CREATE INDEX "Post_pinned_type_publishedAt_idx" ON "Post"("pinned", "type", "publishedAt");

-- CreateIndex
CREATE INDEX "Comment_postId_createdAt_idx" ON "Comment"("postId", "createdAt");

-- CreateIndex
CREATE INDEX "Comment_authorId_createdAt_idx" ON "Comment"("authorId", "createdAt");

-- CreateIndex
CREATE INDEX "Comment_status_createdAt_idx" ON "Comment"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
