import { PrismaPlayersRepository } from "../../../repositories/prisma/prismaPlayersRepository";
import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { FindAllPlayersForUserAndTeamController } from "./findAllPlayersForUserAndTeamController";
import { FindAllPlayersForUserAndTeamService } from "./findAllPlayersForUserAndTeamService";

export const FindAllPlayersForUserAndTeamFactory = () => {
  const playersRepository = new PrismaPlayersRepository();
  const usersRepository = new PrismaUsersRepository();
  const teamsRepository = new PrismaTeamsRepository();

  const findAllPlayersForUserAndTeamService =
    new FindAllPlayersForUserAndTeamService(
      playersRepository,
      usersRepository,
      teamsRepository
    );

  const findAllPlayersForUserAndTeamController =
    new FindAllPlayersForUserAndTeamController(
      findAllPlayersForUserAndTeamService
    );

  return findAllPlayersForUserAndTeamController;
};
