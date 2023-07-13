import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { DeleteTeamController } from "./deleteTeamController";
import { DeleteTeamService } from "./deleteTeamService";

export const DeleteTeamFactory = () => {
  const teamsRepository = new PrismaTeamsRepository();
  const deleteTeamService = new DeleteTeamService(teamsRepository);
  const deleteTeamController = new DeleteTeamController(deleteTeamService);

  return deleteTeamController;
};
