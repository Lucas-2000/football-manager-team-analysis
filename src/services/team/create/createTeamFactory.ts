import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { CreateTeamController } from "./createTeamController";
import { CreateTeamService } from "./createTeamService";

export const CreateTeamFactory = () => {
  const teamsRepository = new PrismaTeamsRepository();
  const usersRepository = new PrismaUsersRepository();
  const createTeamService = new CreateTeamService(
    teamsRepository,
    usersRepository
  );
  const createTeamController = new CreateTeamController(createTeamService);

  return createTeamController;
};
