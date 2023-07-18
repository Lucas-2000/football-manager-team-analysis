import { describe, expect, it } from "vitest";
import { CreateTeamService } from "../create/createTeamService";
import { UpdateTeamService } from "./updateTeamService";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { EnumTeamGrade } from "@prisma/client";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../../user/create/createUserService";

describe("Update Team Service", () => {
  it("should be able to update a team", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const updateTeam = new UpdateTeamService(teamsRepository, usersRepository);
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
      updateTeam.execute({
        id: "1",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.B,
        userId: "1",
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to update a team if team don't found", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const updateTeam = new UpdateTeamService(teamsRepository, usersRepository);
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
      updateTeam.execute({
        id: "2",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.B,
        userId: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to update a team if user don't found", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const updateTeam = new UpdateTeamService(teamsRepository, usersRepository);
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
      updateTeam.execute({
        id: "1",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.B,
        userId: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
