import { PrismaPlayerRepository } from "../../../repositories/prisma/prismaPlayersRepository";
import { PrismaPositionsRepository } from "../../../repositories/prisma/prismaPositionsRepository";
import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { UpdatePlayerController } from "./updatePlayerController";
import { UpdatePlayerService } from "./updatePlayerService";

export const UpdatePlayerFactory = () => {
  const playersRepository = new PrismaPlayerRepository();
  const teamsRepository = new PrismaTeamsRepository();
  const positionsRepository = new PrismaPositionsRepository();
  const updatePlayerService = new UpdatePlayerService(
    playersRepository,
    teamsRepository,
    positionsRepository
  );
  const updatePlayerController = new UpdatePlayerController(
    updatePlayerService
  );

  return updatePlayerController;
};
