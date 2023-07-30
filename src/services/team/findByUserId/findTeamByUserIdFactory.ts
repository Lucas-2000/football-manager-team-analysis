import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { FindTeamByUserIdController } from "./findTeamByUserIdController";
import { FindTeamByUserIdService } from "./findTeamByUserIdService";

export const FindTeamByUserIdFactory = () => {
  const teamsRepository = new PrismaTeamsRepository();
  const findTeamByUserIdService = new FindTeamByUserIdService(teamsRepository);
  const findTeamByUserIdController = new FindTeamByUserIdController(
    findTeamByUserIdService
  );

  return findTeamByUserIdController;
};
