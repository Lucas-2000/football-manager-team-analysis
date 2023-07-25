import { describe, expect, it } from "vitest";
import { InMemoryPlayersRepository } from "../../../repositories/inMemory/inMemoryPlayersRepository";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { InMemoryPositionsRepository } from "../../../repositories/inMemory/inMemoryPositionsRepository";
import { EnumTeamGrade } from "@prisma/client";
import { CreateTeamService } from "../../team/create/createTeamService";
import { CreateUserService } from "../../user/create/createUserService";
import { GenerateReportPlayersService } from "./generateReportPlayersService";

describe("Generate Report Players Service", () => {
  it("should be able to generate player report", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const usersRepository = new InMemoryUsersRepository();
    const teamsRepository = new InMemoryTeamsRepository();
    const positionsRepository = new InMemoryPositionsRepository();

    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createUserService = new CreateUserService(usersRepository);
    const generateReportPlayersService = new GenerateReportPlayersService(
      playersRepository,
      usersRepository,
      teamsRepository,
      positionsRepository
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
      generateReportPlayersService.execute({
        userId: "1",
        teamId: "1",
      })
    ).resolves.toBeInstanceOf(Buffer);
  });

  it("should not be able to generate player report if user not found", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const usersRepository = new InMemoryUsersRepository();
    const teamsRepository = new InMemoryTeamsRepository();
    const positionsRepository = new InMemoryPositionsRepository();

    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createUserService = new CreateUserService(usersRepository);
    const generateReportPlayersService = new GenerateReportPlayersService(
      playersRepository,
      usersRepository,
      teamsRepository,
      positionsRepository
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
      generateReportPlayersService.execute({
        userId: "2",
        teamId: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to generate player report if team not found", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const usersRepository = new InMemoryUsersRepository();
    const teamsRepository = new InMemoryTeamsRepository();
    const positionsRepository = new InMemoryPositionsRepository();

    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createUserService = new CreateUserService(usersRepository);
    const generateReportPlayersService = new GenerateReportPlayersService(
      playersRepository,
      usersRepository,
      teamsRepository,
      positionsRepository
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
      generateReportPlayersService.execute({
        userId: "1",
        teamId: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
