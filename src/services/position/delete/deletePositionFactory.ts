import { PrismaPositionsRepository } from "../../../repositories/prisma/prismaPositionsRepository";
import { DeletePositionController } from "./deletePositionController";
import { DeletePositionService } from "./deletePositionService";

export const DeletePositionFactory = () => {
  const positionsRepository = new PrismaPositionsRepository();
  const deletePositionService = new DeletePositionService(positionsRepository);
  const deletePositionController = new DeletePositionController(
    deletePositionService
  );

  return deletePositionController;
};
