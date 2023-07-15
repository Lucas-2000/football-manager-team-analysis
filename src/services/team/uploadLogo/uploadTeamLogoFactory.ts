import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { UploadTeamLogoController } from "./uploadTeamLogoController";
import { UploadTeamLogoService } from "./uploadTeamLogoService";

export const UploadTeamLogoFactory = () => {
  const teamsRepository = new PrismaTeamsRepository();
  const uploadTeamLogoService = new UploadTeamLogoService(teamsRepository);
  const uploadTeamLogoController = new UploadTeamLogoController(
    uploadTeamLogoService
  );

  return uploadTeamLogoController;
};
