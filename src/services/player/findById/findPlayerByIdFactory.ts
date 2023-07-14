import { PrismaPlayerRepository } from "../../../repositories/prisma/prismaPlayersRepository";
import { FindPlayerByIdController } from "./findPlayerByIdController";
import { FindPlayerByIdService } from "./findPlayerByIdService";

export const FindPlayerByIdFactory = () => {
  const playersRepository = new PrismaPlayerRepository();
  const findPlayerByIdService = new FindPlayerByIdService(playersRepository);
  const findPlayerByIdController = new FindPlayerByIdController(
    findPlayerByIdService
  );

  return findPlayerByIdController;
};
