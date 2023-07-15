import { describe, expect, it } from "vitest";
import { CreateTeamService } from "../create/createTeamService";
import { UpdateTeamService } from "./updateTeamService";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { EnumTeamGrade } from "@prisma/client";

describe("Update Team Service", () => {
  it("should be able to update a team", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const createTeam = new CreateTeamService(teamsRepository);
    const updateTeam = new UpdateTeamService(teamsRepository);

    await createTeam.execute({
      id: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
    });

    await expect(
      updateTeam.execute({
        id: "1",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.B,
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to update a team if team don't found", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const createTeam = new CreateTeamService(teamsRepository);
    const updateTeam = new UpdateTeamService(teamsRepository);

    await createTeam.execute({
      id: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
    });

    await expect(
      updateTeam.execute({
        id: "2",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.B,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
