import { PrismaPlayersRepository } from "../../../repositories/prisma/prismaPlayersRepository";
import { PrismaPositionsRepository } from "../../../repositories/prisma/prismaPositionsRepository";
import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { GenerateReportPlayersController } from "./generateReportPlayersController";
import { GenerateReportPlayersService } from "./generateReportPlayersService";

export const GenerateReportPlayersFactory = () => {
  const playersRepository = new PrismaPlayersRepository();
  const usersRepository = new PrismaUsersRepository();
  const teamsRepository = new PrismaTeamsRepository();
  const positionsRepository = new PrismaPositionsRepository();

  const generateReportPlayersService = new GenerateReportPlayersService(
    playersRepository,
    usersRepository,
    teamsRepository,
    positionsRepository
  );

  const generateReportPlayersController = new GenerateReportPlayersController(
    generateReportPlayersService
  );

  return generateReportPlayersController;
};
