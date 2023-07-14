import { PrismaPositionsRepository } from "../../../repositories/prisma/prismaPositionsRepository";
import { UpdatePositionController } from "./updatePositionController";
import { UpdatePositionService } from "./updatePositionService";

export const UpdatePositionFactory = () => {
  const positionsRepository = new PrismaPositionsRepository();
  const updatePositionService = new UpdatePositionService(positionsRepository);
  const updatePositionController = new UpdatePositionController(
    updatePositionService
  );

  return updatePositionController;
};
