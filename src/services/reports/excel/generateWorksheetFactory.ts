import { PrismaPlayersRepository } from "../../../repositories/prisma/prismaPlayersRepository";
import { PrismaTeamsRepository } from "../../../repositories/prisma/prismaTeamsRepository";
import { PrismaUsersRepository } from "../../../repositories/prisma/prismaUsersRepository";
import { GenerateWorksheetController } from "./generateWorksheetController";
import { GenerateWorksheetService } from "./generateWorksheetService";

export const GenerateWorksheetFactory = () => {
  const playersRepository = new PrismaPlayersRepository();
  const usersRepository = new PrismaUsersRepository();
  const teamsRepository = new PrismaTeamsRepository();

  const generateWorksheetService = new GenerateWorksheetService(
    playersRepository,
    usersRepository,
    teamsRepository
  );

  const generateWorksheetController = new GenerateWorksheetController(
    generateWorksheetService
  );

  return generateWorksheetController;
};
