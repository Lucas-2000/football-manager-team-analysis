import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { UploadUserAvatarController } from "./uploadUserAvatarController";
import { UploadUserAvatarService } from "./uploadUserAvatarService";

export const UploadUserAvatarFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const uploadUserAvatarService = new UploadUserAvatarService(usersRepository);
  const uploadUserAvatarController = new UploadUserAvatarController(
    uploadUserAvatarService
  );

  return uploadUserAvatarController;
};
