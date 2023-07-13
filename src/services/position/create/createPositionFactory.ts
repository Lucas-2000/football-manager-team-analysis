import { PrismaPositionsRepository } from "../../../repositories/prisma/prismaPositionsRepository";
import { CreatePositionController } from "./createPositionController";
import { CreatePositionService } from "./createPositionService";

export const CreatePositionFactory = () => {
  const positionsRepository = new PrismaPositionsRepository();
  const createPositionService = new CreatePositionService(positionsRepository);
  const createPositionController = new CreatePositionController(
    createPositionService
  );

  return createPositionController;
};
