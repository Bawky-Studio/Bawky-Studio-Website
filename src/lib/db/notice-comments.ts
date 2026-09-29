import { prisma } from "@/lib/db/prisma";

export async function listNoticeComments(noticeId: string) {
  return prisma.noticeComment.findMany({
    where: { noticeId },
    orderBy: { createdAt: "asc" },
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

export async function createNoticeComment(input: {
  noticeId: string;
  authorId: string;
  content: string;
}) {
  return prisma.noticeComment.create({
    data: {
      noticeId: input.noticeId,
      authorId: input.authorId,
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
