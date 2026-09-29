import { prisma } from "@/lib/db/prisma";

export async function listCommunityPosts() {
  return prisma.communityPost.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          steamid: true,
          personaName: true,
          avatar: true,
        },
      },
    },
  });
}

export async function createCommunityPost(input: {
  authorId: string;
  title: string;
  content: string;
}) {
  return prisma.communityPost.create({
    data: {
      authorId: input.authorId,
      title: input.title,
      content: input.content,
    },
    include: {
      author: {
        select: {
          steamid: true,
          personaName: true,
          avatar: true,
        },
      },
    },
  });
}
