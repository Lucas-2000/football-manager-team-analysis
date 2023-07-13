import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { FindAllTeamsController } from "./findAllTeamsController";
import { FindAllTeamsService } from "./findAllTeamsService";

export const FindAllTeamsFactory = () => {
  const teamsRepostory = new PrismaTeamsRepository();
  const findAllTeamsService = new FindAllTeamsService(teamsRepostory);
  const findAllTeamsController = new FindAllTeamsController(
    findAllTeamsService
  );

  return findAllTeamsController;
};
