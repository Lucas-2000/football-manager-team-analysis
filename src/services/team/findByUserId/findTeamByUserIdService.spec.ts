import { describe, expect, it } from "vitest";
import { CreateTeamService } from "../create/createTeamService";
import { FindTeamByUserIdService } from "./findTeamByUserIdService";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { EnumTeamGrade } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../../user/create/createUserService";

describe("Find Team By User Id Service", () => {
  it("should return team by user id", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const findTeamByUserIdService = new FindTeamByUserIdService(
      teamsRepository
    );
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
      findTeamByUserIdService.execute({ userId: "1" })
    ).resolves.toHaveProperty("id");
  });

  it("should not return team by user id if user id not found", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const findTeamByUserIdService = new FindTeamByUserIdService(
      teamsRepository
    );
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
      findTeamByUserIdService.execute({ userId: "2" })
    ).rejects.toBeInstanceOf(Error);
  });
});
