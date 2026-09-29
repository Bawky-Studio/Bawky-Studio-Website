const { PrismaClient } = require("@prisma/client") as {
  PrismaClient: new (options?: { log?: string[] }) => any;
};

type PrismaClientInstance = InstanceType<typeof PrismaClient>;

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClientInstance | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
