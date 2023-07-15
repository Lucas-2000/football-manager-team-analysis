import { describe, expect, it } from "vitest";
import { CreateTeamService } from "../create/createTeamService";
import { FindTeamByIdService } from "./findTeamByIdService";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { EnumTeamGrade } from "@prisma/client";
import { v4 as uuid } from "uuid";

describe("Find Team By Id Service", () => {
  it("should return team by id", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const findTeamByIdService = new FindTeamByIdService(teamsRepository);
    const createTeamService = new CreateTeamService(teamsRepository);

    const correctId = uuid();

    await createTeamService.execute({
      id: correctId,
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
    });

    await expect(
      findTeamByIdService.execute({ id: correctId })
    ).resolves.toHaveProperty("id");
  });

  it("should not return team by id if id not found", async () => {
    const teamsRepository = new InMemoryTeamsRepository();
    const findTeamByIdService = new FindTeamByIdService(teamsRepository);
    const createTeamService = new CreateTeamService(teamsRepository);

    const correctId = uuid();

    await createTeamService.execute({
      id: correctId,
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
    });

    await expect(
      findTeamByIdService.execute({ id: "2" })
    ).rejects.toBeInstanceOf(Error);
  });
});
