import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { UpdateTeamController } from "./updateTeamController";
import { UpdateTeamService } from "./updateTeamService";

export const UpdateTeamFactory = () => {
  const teamsRepository = new PrismaTeamsRepository();
  const updateTeamService = new UpdateTeamService(teamsRepository);
  const updateTeamController = new UpdateTeamController(updateTeamService);

  return updateTeamController;
};
