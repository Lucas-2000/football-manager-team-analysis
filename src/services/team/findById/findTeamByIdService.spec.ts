import { describe, expect, it } from "vitest";
import { CreateTeamService } from "../create/createTeamService";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";
import { FindTeamByIdService } from "./findTeamByIdService";
import { Team } from "../../../entities/team";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";

describe("Find Team By Id Service", () => {
  it("should return team by id", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const findTeamByIdService = new FindTeamByIdService(teamsRepository);
    const createTeamService = new CreateTeamService(teamsRepository);

    await createTeamService.execute({
      teamId: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      teamLogo: "exemplo",
    });

    await expect(
      findTeamByIdService.execute({ teamId: "1" })
    ).resolves.toBeInstanceOf(Team);
  });

  it("should not return team by id if id not found", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const findTeamByIdService = new FindTeamByIdService(teamsRepository);
    const createTeamService = new CreateTeamService(teamsRepository);

    await createTeamService.execute({
      teamId: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      teamLogo: "exemplo",
    });

    await expect(
      findTeamByIdService.execute({ teamId: "2" })
    ).rejects.toBeInstanceOf(Error);
  });
});
