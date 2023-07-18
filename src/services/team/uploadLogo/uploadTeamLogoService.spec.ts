import { describe, expect, it } from "vitest";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { CreateTeamService } from "../create/createTeamService";
import { EnumTeamGrade } from "@prisma/client";
import { UploadTeamLogoService } from "./uploadTeamLogoService";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../../user/create/createUserService";

describe("Upload Team Logo Service", () => {
  it("should be able to upload a logo for a team", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const uploadTeamLogo = new UploadTeamLogoService(teamsRepository);
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
      uploadTeamLogo.execute({
        id: "1",
        teamLogo: "afsaosfaoksfafas.png",
      })
    ).resolves.toHaveProperty("teamLogo");
  });

  it("should not be able to upload a logo for a team if team not found", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const uploadTeamLogo = new UploadTeamLogoService(teamsRepository);
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
      uploadTeamLogo.execute({
        id: "2",
        teamLogo: "afsaosfaoksfafas.png",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to upload a logo for a team if team logo not found", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const uploadTeamLogo = new UploadTeamLogoService(teamsRepository);
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
      uploadTeamLogo.execute({
        id: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
