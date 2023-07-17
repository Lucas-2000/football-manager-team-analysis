import { expect, test } from "vitest";
import { Team } from "./team";
import { EnumTeamGrade } from "@prisma/client";

test("create a team", () => {
  const team = new Team({
    id: "1",
    teamName: "Corinthians",
    teamLocalization: "SP",
    teamCountry: "Brasil",
    teamLeague: "Brasileirão",
    teamGrade: EnumTeamGrade.A,
    teamLogo: "exemplo",
    userId: "1",
  });

  expect(team).instanceOf(Team);
  expect(team.teamName).toEqual("Corinthians");
});
