import { PrismaPlayersRepository } from "../../../repositories/prisma/prismaPlayersRepository";
import { UploadPlayerImageController } from "./uploadPlayerImageController";
import { UploadPlayerImageService } from "./uploadPlayerImageService";

export const UploadPlayerImageFactory = () => {
  const playersRepository = new PrismaPlayersRepository();
  const uploadPlayerImageService = new UploadPlayerImageService(
    playersRepository
  );
  const uploadPlayerImageController = new UploadPlayerImageController(
    uploadPlayerImageService
  );

  return uploadPlayerImageController;
};
