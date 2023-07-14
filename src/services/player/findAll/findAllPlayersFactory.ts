import { FindAllPlayersService } from "./findAllPlayersService";
import { PrismaPlayerRepository } from "../../../repositories/prisma/prismaPlayersRepository";
import { FindAllPlayersController } from "./findAllPlayersController";

export const FindAllPlayersFactory = () => {
  const playersRepository = new PrismaPlayerRepository();
  const findAllPlayersService = new FindAllPlayersService(playersRepository);
  const findAllPlayersController = new FindAllPlayersController(
    findAllPlayersService
  );

  return findAllPlayersController;
};
