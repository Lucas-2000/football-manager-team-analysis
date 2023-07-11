import { describe, expect, it } from "vitest";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { CreateTeamService } from "../create/createTeamService";
import { DeleteTeamService } from "./deleteTeamService";

describe("Delete Team Service", () => {
  it("should be able to delete a team", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const createTeam = new CreateTeamService(teamsRepository);
    const deleteTeam = new DeleteTeamService(teamsRepository);

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
      deleteTeam.execute({
        teamId: "1",
      })
    ).resolves.toBeInstanceOf(Array);
  });

  it("should not be able to delete a team if team don't found", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const createTeam = new CreateTeamService(teamsRepository);
    const deleteTeam = new DeleteTeamService(teamsRepository);

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
      deleteTeam.execute({
        teamId: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});