import fs from "fs/promises";
import path from "path";
import { describe, expect, it } from "vitest";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { CreateTeamService } from "../create/createTeamService";
import { DeleteTeamService } from "./deleteTeamService";
import { EnumTeamGrade } from "@prisma/client";
import { UploadTeamLogoService } from "../uploadLogo/uploadTeamLogoService";

describe("Delete Team Service", () => {
  it("should be able to delete a team", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const createTeam = new CreateTeamService(teamsRepository);
    const deleteTeam = new DeleteTeamService(teamsRepository);
    const uploadLogoTeam = new UploadTeamLogoService(teamsRepository);

    await createTeam.execute({
      id: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
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
    fs.writeFile(tempFilePath, "conteúdo do arquivo");

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
    const createTeam = new CreateTeamService(teamsRepository);
    const deleteTeam = new DeleteTeamService(teamsRepository);

    await createTeam.execute({
      id: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
    });

    await expect(
      deleteTeam.execute({
        id: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
