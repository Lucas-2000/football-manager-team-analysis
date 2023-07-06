import { describe, expect, it } from "vitest";
import { CreateTeam } from "./createTeam";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";
import { Team } from "../../../entities/team";

describe("Create Team", () => {
  it("should be able to create a new team", () => {
    const createTeam = new CreateTeam();
    expect(
      createTeam.execute({
        teamId: "1",
        teamName: "Corinthians",
        teamLocalization: "SP",
        teamCountry: "Brasil",
        teamGrade: EnumTeamGrade.A,
      })
    ).resolves.toBeInstanceOf(Team);
  });
});
