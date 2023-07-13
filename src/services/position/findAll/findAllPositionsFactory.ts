import { PrismaPositionsRepository } from "../../../repositories/prisma/prismaPositionsRepository";
import { FindAllPositionsController } from "./findAllPositionsController";
import { FindAllPositionsService } from "./findAllPositionsService";

export const FindAllPositionsFactory = () => {
  const positionsRepository = new PrismaPositionsRepository();
  const findAllPositionsService = new FindAllPositionsService(
    positionsRepository
  );
  const findAllPositionsController = new FindAllPositionsController(
    findAllPositionsService
  );

  return findAllPositionsController;
};
