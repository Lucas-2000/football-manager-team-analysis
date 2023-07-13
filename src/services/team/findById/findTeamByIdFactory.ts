import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { FindTeamByIdController } from "./findTeamByIdController";
import { FindTeamByIdService } from "./findTeamByIdService";

export const FindTeamByIdFactory = () => {
  const teamsRepository = new PrismaTeamsRepository();
  const findTeamByIdService = new FindTeamByIdService(teamsRepository);
  const findTeamByIdController = new FindTeamByIdController(
    findTeamByIdService
  );

  return findTeamByIdController;
};
