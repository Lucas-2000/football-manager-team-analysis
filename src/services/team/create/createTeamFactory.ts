import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { CreateTeamController } from "./createTeamController";
import { CreateTeamService } from "./createTeamService";

export const CreateTeamFactory = () => {
  const teamsRepository = new PrismaTeamsRepository();
  const createTeamService = new CreateTeamService(teamsRepository);
  const createTeamController = new CreateTeamController(createTeamService);

  return createTeamController;
};
