import { FindAllPlayersService } from "./findAllPlayersService";
import { PrismaPlayersRepository } from "../../../repositories/prisma/prismaPlayersRepository";
import { FindAllPlayersController } from "./findAllPlayersController";

export const FindAllPlayersFactory = () => {
  const playersRepository = new PrismaPlayersRepository();
  const findAllPlayersService = new FindAllPlayersService(playersRepository);
  const findAllPlayersController = new FindAllPlayersController(
    findAllPlayersService
  );

  return findAllPlayersController;
};
