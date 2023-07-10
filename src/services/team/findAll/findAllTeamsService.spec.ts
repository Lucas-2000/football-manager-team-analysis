import { describe, expect, it } from "vitest";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/team/inMemoryTeamsRepository";
import { FindAllTeamsService } from "./findAllTeamsService";
import { CreateTeamService } from "../create/createTeamService";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";

describe("Find All Teams Service", () => {
  it("should return all teams", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const findAllTeamsService = new FindAllTeamsService(teamsRepository);
    const createTeam = new CreateTeamService(teamsRepository);

    const team = await createTeam.execute({
      teamId: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      teamLogo: "exemplo",
    });

    await expect(findAllTeamsService.execute()).resolves.toEqual([team]);
  });
});
