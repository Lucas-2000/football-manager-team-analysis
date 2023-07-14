import { CreatePlayerService } from "./createPlayerService";
import { PrismaPlayerRepository } from "../../../repositories/prisma/prismaPlayersRepository";
import { CreatePlayerController } from "./createPlayerController";
import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { PrismaPositionsRepository } from "../../../repositories/prisma/prismaPositionsRepository";

export const CreatePlayerFactory = () => {
  const playersRepository = new PrismaPlayerRepository();
  const teamsRepository = new PrismaTeamsRepository();
  const positionsRepository = new PrismaPositionsRepository();
  const createPlayerService = new CreatePlayerService(
    playersRepository,
    teamsRepository,
    positionsRepository
  );
  const createPlayerController = new CreatePlayerController(
    createPlayerService
  );

  return createPlayerController;
};
