import { describe, expect, it } from "vitest";
import { CreateTeamService } from "../create/createTeamService";
import { FindTeamByIdService } from "./findTeamByIdService";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { EnumTeamGrade } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../../user/create/createUserService";

describe("Find Team By Id Service", () => {
  it("should return team by id", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const findTeamByIdService = new FindTeamByIdService(teamsRepository);
    const createTeamService = new CreateTeamService(
      teamsRepository,
      usersRepository
    );
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    const correctId = uuid();

    await createTeamService.execute({
      id: correctId,
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: "1",
    });

    await expect(
      findTeamByIdService.execute({ id: correctId })
    ).resolves.toHaveProperty("id");
  });

  it("should not return team by id if id not found", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const findTeamByIdService = new FindTeamByIdService(teamsRepository);
    const createTeamService = new CreateTeamService(
      teamsRepository,
      usersRepository
    );
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    const correctId = uuid();

    await createTeamService.execute({
      id: correctId,
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: "1",
    });

    await expect(
      findTeamByIdService.execute({ id: "2" })
    ).rejects.toBeInstanceOf(Error);
  });
});
