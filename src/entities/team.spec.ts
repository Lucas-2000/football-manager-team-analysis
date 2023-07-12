import { expect, test } from "vitest";
import { Team } from "./team";
import { EnumTeamGrade } from "../utils/dicts/enumTeamGrade";

test("create a team", () => {
  const team = new Team({
    id: "1",
    teamName: "Corinthians",
    teamLocalization: "SP",
    teamCountry: "Brasil",
    teamLeague: "Brasileirão",
    teamGrade: EnumTeamGrade.A,
    teamLogo: "exemplo",
  });

  expect(team).instanceOf(Team);
  expect(team.teamName).toEqual("Corinthians");
});
