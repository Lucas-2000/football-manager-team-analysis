import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { FindTeamByUserIdController } from "./findTeamByUserIdController";
import { FindTeamByUserIdService } from "./findTeamByUserIdService";

export const FindTeamByUserIdFactory = () => {
  const teamsRepository = new PrismaTeamsRepository();
  const usersRepository = new PrismaUsersRepository();
  const findTeamByUserIdService = new FindTeamByUserIdService(
    teamsRepository,
    usersRepository
  );
  const findTeamByUserIdController = new FindTeamByUserIdController(
    findTeamByUserIdService
  );

  return findTeamByUserIdController;
};
