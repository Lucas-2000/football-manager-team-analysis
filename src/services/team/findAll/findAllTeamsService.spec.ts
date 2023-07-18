import { describe, expect, it } from "vitest";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { FindAllTeamsService } from "./findAllTeamsService";
import { CreateTeamService } from "../create/createTeamService";
import { EnumTeamGrade } from "@prisma/client";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../../user/create/createUserService";

describe("Find All Teams Service", () => {
  it("should return all teams", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const findAllTeamsService = new FindAllTeamsService(teamsRepository);
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    const team = await createTeam.execute({
      id: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: "1",
    });

    await expect(findAllTeamsService.execute()).resolves.toEqual([team]);
  });
});
