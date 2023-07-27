import { PrismaPasswordResetRepository } from "../../../repositories/prisma/prismaPasswordResetRepository";
import { FindPasswordResetByTokenController } from "./findPasswordResetByTokenController";
import { FindPasswordResetByTokenService } from "./findPasswordResetByTokenService";

export const FindPasswordResetByTokenFactory = () => {
  const passwordResetRepository = new PrismaPasswordResetRepository();
  const findPasswordResetByTokenService = new FindPasswordResetByTokenService(
    passwordResetRepository
  );
  const findPasswordResetByTokenController =
    new FindPasswordResetByTokenController(findPasswordResetByTokenService);

  return findPasswordResetByTokenController;
};
