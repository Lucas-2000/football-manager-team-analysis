import { PasswordReset } from "../../entities/passwordReset";
import { prisma } from "../../utils/config/prisma/prismaClient";
import { generateRandomToken } from "../../utils/math/generateRandomToken";
import { PasswordResetRepository } from "../passwordResetRepository";
import { v4 as uuid } from "uuid";

export class PrismaPasswordResetRepository implements PasswordResetRepository {
  async generate({
    id,
    token,
    expiresDate,
    userId,
  }: PasswordReset): Promise<void> {
    await prisma.passwordReset.create({
      data: {
        id: id ?? uuid(),
        token: token ?? generateRandomToken(15),
        expiresDate: expiresDate ?? new Date(Date.now() + 86400 * 1000),
        userId,
      },
    });
  }

  async findIndex(userId: string): Promise<number> {
    const reset = await prisma.passwordReset.findMany();

    const resetIndex = reset.findIndex((r) => r.userId === userId);

    if (resetIndex < 0) return -1;

    return resetIndex;
  }

  async delete(userId: string): Promise<void> {
    const resetId = await prisma.passwordReset.findFirst({
      where: {
        userId: userId,
      },
    });

    await prisma.passwordReset.delete({
      where: { id: resetId?.id },
    });
  }

  async findByToken(token: string): Promise<PasswordReset | undefined> {
    const passwordReset = await prisma.passwordReset.findFirst({
      where: { token: token },
    });

    if (passwordReset === null) return;

    return new PasswordReset({
      id: passwordReset.id,
      token: passwordReset.token,
      expiresDate: passwordReset.expiresDate,
      userId: passwordReset.userId,
    });
  }
}
