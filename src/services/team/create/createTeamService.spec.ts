import { CreateTeamService } from "./createTeamService";
import { describe, expect, it } from "vitest";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { EnumTeamGrade } from "@prisma/client";

describe("Create Team Service", () => {
  it("should be able to create a new team", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const createTeam = new CreateTeamService(teamsRepository);
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
    const createTeam = new CreateTeamService(teamsRepository);
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
});
