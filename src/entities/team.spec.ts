import { expect, test } from "vitest";
import { Team } from "./team";
import { EnumTeamGrade } from "../utils/dicts/enumTeamGrade";

test("create a team", () => {
  const team = new Team({
    teamName: "Corinthians",
    teamLocalization: "SP",
    teamCountry: "Brasil",
    teamGrade: EnumTeamGrade.A,
  });

  expect(team).instanceOf(Team);
  expect(team.teamName).toEqual("Corinthians");
});
