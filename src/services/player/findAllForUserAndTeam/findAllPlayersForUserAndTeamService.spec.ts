import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { InMemoryPlayersRepository } from "../../../repositories/inMemory/inMemoryPlayersRepository";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { FindAllPlayersForUserAndTeamService } from "./findAllPlayersForUserAndTeamService";
import { CreateUserService } from "../../user/create/createUserService";
import { CreateTeamService } from "../../team/create/createTeamService";
import { EnumTeamGrade } from "@prisma/client";

describe("Find All Players for user and team service", () => {
  it("should be able to find all players by a user and team", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const playersRepository = new InMemoryPlayersRepository();
    const teamsRepository = new InMemoryTeamsRepository();

    const createUserService = new CreateUserService(usersRepository);

    const createTeamService = new CreateTeamService(
      teamsRepository,
      usersRepository
    );

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await createTeamService.execute({
      id: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: "1",
    });

    const findAllPlayersForUserAndTeamService =
      new FindAllPlayersForUserAndTeamService(
        playersRepository,
        usersRepository,
        teamsRepository
      );

    await expect(
      findAllPlayersForUserAndTeamService.execute({ userId: "1", teamId: "1" })
    ).resolves.toBeInstanceOf(Array);
  });

  it("should not be able to find all players by a user and team if user not found", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const playersRepository = new InMemoryPlayersRepository();
    const teamsRepository = new InMemoryTeamsRepository();

    const createUserService = new CreateUserService(usersRepository);

    const createTeamService = new CreateTeamService(
      teamsRepository,
      usersRepository
    );

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await createTeamService.execute({
      id: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: "1",
    });

    const findAllPlayersForUserAndTeamService =
      new FindAllPlayersForUserAndTeamService(
        playersRepository,
        usersRepository,
        teamsRepository
      );

    await expect(
      findAllPlayersForUserAndTeamService.execute({ userId: "2", teamId: "1" })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to find all players by a user and team if team not found", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const playersRepository = new InMemoryPlayersRepository();
    const teamsRepository = new InMemoryTeamsRepository();

    const createUserService = new CreateUserService(usersRepository);

    const createTeamService = new CreateTeamService(
      teamsRepository,
      usersRepository
    );

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await createTeamService.execute({
      id: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: "1",
    });

    const findAllPlayersForUserAndTeamService =
      new FindAllPlayersForUserAndTeamService(
        playersRepository,
        usersRepository,
        teamsRepository
      );

    await expect(
      findAllPlayersForUserAndTeamService.execute({ userId: "1", teamId: "2" })
    ).rejects.toBeInstanceOf(Error);
  });
});
