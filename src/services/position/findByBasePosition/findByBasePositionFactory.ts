import { PrismaPositionsRepository } from "../../../repositories/prisma/prismaPositionsRepository";
import { FindByBasePositionController } from "./findByBasePositionController";
import { FindByBasePositionService } from "./findByBasePositionService";

export const FindByBasePosition = () => {
  const positionsRepository = new PrismaPositionsRepository();
  const findByBasePositionService = new FindByBasePositionService(
    positionsRepository
  );
  const findByBasePositionController = new FindByBasePositionController(
    findByBasePositionService
  );

  return findByBasePositionController;
};
