import { PrismaPasswordResetRepository } from "../../repositories/prisma/prismaPasswordResetRepository";
import { PrismaUsersRepository } from "../../repositories/prisma/prismaUsersRepository";
import { EmailSendController } from "./emailSendController";
import { EmailSendService } from "./emailSendService";

export const EmailSendFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const passwordResetRepository = new PrismaPasswordResetRepository();
  const emailSendService = new EmailSendService(
    usersRepository,
    passwordResetRepository
  );
  const emailSendController = new EmailSendController(emailSendService);

  return emailSendController;
};
