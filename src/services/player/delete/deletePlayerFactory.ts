import { PrismaPlayersRepository } from "../../../repositories/prisma/prismaPlayersRepository";
import { DeletePlayerController } from "./deletePlayerController";
import { DeletePlayerService } from "./deletePlayerService";

export const DeletePlayerFactory = () => {
  const playersRepository = new PrismaPlayersRepository();
  const deletePlayerService = new DeletePlayerService(playersRepository);
  const deletePlayerController = new DeletePlayerController(
    deletePlayerService
  );

  return deletePlayerController;
};
