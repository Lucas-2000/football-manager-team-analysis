import { CreateTeamService } from "./createTeamService";
import { describe, expect, it } from "vitest";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";
import { Team } from "../../../entities/team";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/team/inMemoryTeamsRepository";

describe("Create Team Service", () => {
  it("should be able to create a new team", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const createTeam = new CreateTeamService(teamsRepository);
    await expect(
      createTeam.execute({
        teamId: "1",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamGrade: EnumTeamGrade.A,
      })
    ).resolves.toBeInstanceOf(Team);
  });

  it("should not be able to create a team if team name already exists", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const createTeam = new CreateTeamService(teamsRepository);
    await createTeam.execute({
      teamId: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamGrade: EnumTeamGrade.A,
    });

    await expect(
      createTeam.execute({
        teamId: "1",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamGrade: EnumTeamGrade.A,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
