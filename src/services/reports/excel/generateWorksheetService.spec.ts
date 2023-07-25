import { describe, expect, it } from "vitest";
import { GenerateWorksheetService } from "./generateWorksheetService";
import { CreateUserService } from "../../user/create/createUserService";
import { CreateTeamService } from "../../team/create/createTeamService";
import { InMemoryPlayersRepository } from "../../../repositories/inMemory/inMemoryPlayersRepository";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { EnumTeamGrade } from "@prisma/client";

describe("Generate Worksheet Service", () => {
  it("should be able to generate a worksheet", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const usersRepository = new InMemoryUsersRepository();
    const teamsRepository = new InMemoryTeamsRepository();

    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createUserService = new CreateUserService(usersRepository);
    const generateWorksheetService = new GenerateWorksheetService(
      playersRepository,
      usersRepository,
      teamsRepository
    );

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await createTeam.execute({
      id: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: "1",
    });

    await expect(
      generateWorksheetService.execute({
        userId: "1",
        teamId: "1",
      })
    ).resolves.toBeTypeOf("string");
  });

  it("should not be able to generate a worksheet if user not found", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const usersRepository = new InMemoryUsersRepository();
    const teamsRepository = new InMemoryTeamsRepository();

    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createUserService = new CreateUserService(usersRepository);
    const generateWorksheetService = new GenerateWorksheetService(
      playersRepository,
      usersRepository,
      teamsRepository
    );

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await createTeam.execute({
      id: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: "1",
    });

    await expect(
      generateWorksheetService.execute({
        userId: "2",
        teamId: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to generate a worksheet if tean not found", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const usersRepository = new InMemoryUsersRepository();
    const teamsRepository = new InMemoryTeamsRepository();

    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createUserService = new CreateUserService(usersRepository);
    const generateWorksheetService = new GenerateWorksheetService(
      playersRepository,
      usersRepository,
      teamsRepository
    );

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await createTeam.execute({
      id: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: "1",
    });

    await expect(
      generateWorksheetService.execute({
        userId: "1",
        teamId: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
