import { expect, test } from "vitest";
import { Team } from "./team";
import { EnumTeamGrade } from "../utils/dicts/enumTeamGrade";

test("create a team", () => {
  const team = new Team({
    id: "1",
    team_name: "Corinthians",
    team_localization: "SP",
    team_country: "Brasil",
    team_grade: EnumTeamGrade.A,
  });

  expect(team).instanceOf(Team);
  expect(team.teamName).toEqual("Corinthians");
});
