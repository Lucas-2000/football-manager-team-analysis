import { describe, expect, it } from "vitest";
import { CreatePlayerService } from "../create/createPlayerService";
import { FindAllPlayersService } from "./findAllPlayersService";
import { InMemoryPlayersRepository } from "../../../repositories/inMemory/inMemoryPlayersRepository";
import { EnumPlayerAttributesRange } from "../../../utils/dicts/enumPlayerAttributesRange";
import { InMemoryTeamsRepository } from "../../../repositories/inMemory/inMemoryTeamsRepository";
import { InMemoryPositionsRepository } from "../../../repositories/inMemory/inMemoryPositionsRepository";
import { CreateTeamService } from "../../team/create/createTeamService";
import { CreatePositionService } from "../../position/create/createPositionService";
import {
  EnumPlayerPositionBase,
  EnumPlayerPositionRole,
  EnumRoleType,
  EnumTeamGrade,
} from "@prisma/client";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../../user/create/createUserService";

describe("Find All Teams Players", () => {
  it("should return all players", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const findAllPlayersService = new FindAllPlayersService(playersRepository);
    const teamsRepository = new InMemoryTeamsRepository();
    const positionsRepository = new InMemoryPositionsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const createPlayer = new CreatePlayerService(
      playersRepository,
      teamsRepository,
      positionsRepository,
      usersRepository
    );
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createUserService = new CreateUserService(usersRepository);
    const createPositionService = new CreatePositionService(
      positionsRepository
    );

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await createPositionService.execute({
      id: "1",
      basePosition: EnumPlayerPositionBase.Midfielder,
      positionRole: EnumPlayerPositionRole.AttackingMidfielder,
      roleType: [EnumRoleType.Attack, EnumRoleType.Support],
    });

    await createTeam.execute({
      id: "1",
      teamName: "Corinthians",
      teamLocalization: "SP",
      teamCountry: "Brasil",
      teamLeague: "Brasileirão",
      teamGrade: EnumTeamGrade.A,
      userId: "1",
    });

    const player = await createPlayer.execute({
      name: "Kevin de Bruyne",
      birthdate: "1991-08-01",
      lenght: 181,
      weight: 68,
      jersey: 17,
      positionId: "1",
      teamId: "1",
      userId: "1",
      corners: EnumPlayerAttributesRange.Fifteen,
      crossing: EnumPlayerAttributesRange.Fifteen,
      dribbling: EnumPlayerAttributesRange.Fifteen,
      finishing: EnumPlayerAttributesRange.Fifteen,
      firstTouch: EnumPlayerAttributesRange.Fifteen,
      freeKickTaking: EnumPlayerAttributesRange.Fifteen,
      heading: EnumPlayerAttributesRange.Fifteen,
      longShots: EnumPlayerAttributesRange.Fifteen,
      longThrows: EnumPlayerAttributesRange.Fifteen,
      marking: EnumPlayerAttributesRange.Fifteen,
      passing: EnumPlayerAttributesRange.Fifteen,
      penaltyTaking: EnumPlayerAttributesRange.Fifteen,
      tackling: EnumPlayerAttributesRange.Fifteen,
      technique: EnumPlayerAttributesRange.Fifteen,
      agression: EnumPlayerAttributesRange.Fifteen,
      anticipation: EnumPlayerAttributesRange.Fifteen,
      bravery: EnumPlayerAttributesRange.Fifteen,
      composure: EnumPlayerAttributesRange.Fifteen,
      concentration: EnumPlayerAttributesRange.Fifteen,
      decisions: EnumPlayerAttributesRange.Fifteen,
      determination: EnumPlayerAttributesRange.Fifteen,
      flair: EnumPlayerAttributesRange.Fifteen,
      leadership: EnumPlayerAttributesRange.Fifteen,
      offTheBall: EnumPlayerAttributesRange.Fifteen,
      positioning: EnumPlayerAttributesRange.Fifteen,
      teamWork: EnumPlayerAttributesRange.Fifteen,
      vision: EnumPlayerAttributesRange.Fifteen,
      workRate: EnumPlayerAttributesRange.Fifteen,
      acceleration: EnumPlayerAttributesRange.Fifteen,
      agility: EnumPlayerAttributesRange.Fifteen,
      balance: EnumPlayerAttributesRange.Fifteen,
      jumpingReach: EnumPlayerAttributesRange.Fifteen,
      naturalFitness: EnumPlayerAttributesRange.Fifteen,
      pace: EnumPlayerAttributesRange.Fifteen,
      stamina: EnumPlayerAttributesRange.Fifteen,
      strenght: EnumPlayerAttributesRange.Fifteen,
    });

    await expect(findAllPlayersService.execute()).resolves.toEqual([player]);
  });
});
