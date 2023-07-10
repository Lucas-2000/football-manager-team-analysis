import { describe, expect, it } from "vitest";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";
import { Team } from "../../../entities/team";
import { CreateTeamService } from "../create/createTeamService";
import { UpdateTeamService } from "./updateTeamService";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";

describe("Update Team Service", () => {
  it("should be able to update a team", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const createTeam = new CreateTeamService(teamsRepository);
    const updateTeam = new UpdateTeamService(teamsRepository);

    await createTeam.execute({
      teamId: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      teamLogo: "exemplo",
    });

    await expect(
      updateTeam.execute({
        teamId: "1",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.B,
        teamLogo: "exemplo",
      })
    ).resolves.toBeInstanceOf(Team);
  });

  it("should not be able to update a team if team don't found", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const createTeam = new CreateTeamService(teamsRepository);
    const updateTeam = new UpdateTeamService(teamsRepository);

    await createTeam.execute({
      teamId: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      teamLogo: "exemplo",
    });

    await expect(
      updateTeam.execute({
        teamId: "2",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamLeague: "Brasileirão",
        teamGrade: EnumTeamGrade.B,
        teamLogo: "exemplo",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
