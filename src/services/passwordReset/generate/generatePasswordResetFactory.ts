import { PrismaPasswordResetRepository } from "../../../repositories/prisma/prismaPasswordResetRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { GeneratePasswordResetController } from "./generatePasswordResetController";
import { GeneratePasswordResetService } from "./generatePasswordResetService";

export const GeneratePasswordResetFactory = () => {
  const passwordResetRepository = new PrismaPasswordResetRepository();
  const usersRepository = new PrismaUsersRepository();
  const generatePasswordResetService = new GeneratePasswordResetService(
    passwordResetRepository,
    usersRepository
  );
  const generatePasswordResetController = new GeneratePasswordResetController(
    generatePasswordResetService
  );

  return generatePasswordResetController;
};
