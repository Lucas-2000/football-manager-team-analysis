import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { UpdateTeamController } from "./updateTeamController";
import { UpdateTeamService } from "./updateTeamService";

export const UpdateTeamFactory = () => {
  const teamsRepository = new PrismaTeamsRepository();
  const usersRepository = new PrismaUsersRepository();
  const updateTeamService = new UpdateTeamService(
    teamsRepository,
    usersRepository
  );
  const updateTeamController = new UpdateTeamController(updateTeamService);

  return updateTeamController;
};
