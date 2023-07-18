import fs from "fs/promises";
import path from "path";
import { describe, expect, it } from "vitest";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { CreateTeamService } from "../create/createTeamService";
import { DeleteTeamService } from "./deleteTeamService";
import { EnumTeamGrade } from "@prisma/client";
import { UploadTeamLogoService } from "../uploadLogo/uploadTeamLogoService";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../../user/create/createUserService";

describe("Delete Team Service", () => {
  it("should be able to delete a team", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const deleteTeam = new DeleteTeamService(teamsRepository);
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
      deleteTeam.execute({
        id: "1",
      })
    ).resolves.toBeInstanceOf(Array);
  });

  it("should be able to delete a team and logo from uploads folder if team have a logo", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const deleteTeam = new DeleteTeamService(teamsRepository);
    const uploadLogoTeam = new UploadTeamLogoService(teamsRepository);
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

    const uploadsFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "uploads"
    ); // Caminho base da pasta de uploads
    const tempFilePath = path.join(uploadsFolder, "teste");

    // Cria um arquivo temporário
    await fs.writeFile(tempFilePath, "conteúdo do arquivo");

    await uploadLogoTeam.execute({
      id: "1",
      teamLogo: "teste",
    });

    await expect(
      deleteTeam.execute({
        id: "1",
      })
    ).resolves.toBeInstanceOf(Array);
  });

  it("should not be able to delete a team if team don't found", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const deleteTeam = new DeleteTeamService(teamsRepository);
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
      deleteTeam.execute({
        id: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
