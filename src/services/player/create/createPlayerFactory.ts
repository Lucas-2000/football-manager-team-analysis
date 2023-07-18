import { CreatePlayerService } from "./createPlayerService";
import { PrismaPlayersRepository } from "../../../repositories/prisma/prismaPlayersRepository";
import { CreatePlayerController } from "./createPlayerController";
import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { PrismaPositionsRepository } from "../../../repositories/prisma/prismaPositionsRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";

export const CreatePlayerFactory = () => {
  const playersRepository = new PrismaPlayersRepository();
  const teamsRepository = new PrismaTeamsRepository();
  const positionsRepository = new PrismaPositionsRepository();
  const usersRepository = new PrismaUsersRepository();
  const createPlayerService = new CreatePlayerService(
    playersRepository,
    teamsRepository,
    positionsRepository,
    usersRepository
  );
  const createPlayerController = new CreatePlayerController(
    createPlayerService
  );

  return createPlayerController;
};
