import { describe, expect, it } from "vitest";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { CreateTeamService } from "../create/createTeamService";
import { EnumTeamGrade } from "@prisma/client";
import { UploadTeamLogoService } from "./uploadTeamLogoService";

describe("Upload Team Logo Service", () => {
  it("should be able to upload a logo for a team", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const createTeam = new CreateTeamService(teamsRepository);
    const uploadTeamLogo = new UploadTeamLogoService(teamsRepository);

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
    const createTeam = new CreateTeamService(teamsRepository);
    const uploadTeamLogo = new UploadTeamLogoService(teamsRepository);

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
    const createTeam = new CreateTeamService(teamsRepository);
    const uploadTeamLogo = new UploadTeamLogoService(teamsRepository);

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
