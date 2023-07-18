import { CreateTeamService } from "./createTeamService";
import { describe, expect, it } from "vitest";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { EnumTeamGrade } from "@prisma/client";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../../user/create/createUserService";

describe("Create Team Service", () => {
  it("should be able to create a new team", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await expect(
      createTeam.execute({
        id: "1",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.A,
        userId: "1",
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to create a team if team name already exists", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
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
      createTeam.execute({
        id: "1",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.A,
        userId: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a team if user don't exists", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
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
      createTeam.execute({
        id: "1",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.A,
        userId: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
