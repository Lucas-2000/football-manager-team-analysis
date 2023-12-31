import { CreatePlayerService } from "./../create/createPlayerService";
import { InMemoryPlayersRepository } from "./../../../repositories/inMemory/inMemoryPlayersRepository";
import { describe, expect, it } from "vitest";
import { UpdatePlayerService } from "./updatePlayerService";
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

describe("Update Player Service", () => {
  it("should be able to update a player", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const teamsRepository = new InMemoryTeamsRepository();
    const positionsRepository = new InMemoryPositionsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const updatePlayer = new UpdatePlayerService(
      playersRepository,
      teamsRepository,
      positionsRepository,
      usersRepository
    );
    const createPlayer = new CreatePlayerService(
      playersRepository,
      teamsRepository,
      positionsRepository,
      usersRepository
    );
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createPositionService = new CreatePositionService(
      positionsRepository
    );
    const createUserService = new CreateUserService(usersRepository);

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

    await createPlayer.execute({
      id: "1",
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

    await expect(
      updatePlayer.execute({
        id: "1",
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
      })
    ).resolves.toHaveProperty("name");
  });

  it("should not be able to update a player if player don't found", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const teamsRepository = new InMemoryTeamsRepository();
    const positionsRepository = new InMemoryPositionsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const updatePlayer = new UpdatePlayerService(
      playersRepository,
      teamsRepository,
      positionsRepository,
      usersRepository
    );
    const createPlayer = new CreatePlayerService(
      playersRepository,
      teamsRepository,
      positionsRepository,
      usersRepository
    );
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createPositionService = new CreatePositionService(
      positionsRepository
    );
    const createUserService = new CreateUserService(usersRepository);

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

    await createPlayer.execute({
      id: "1",
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
    await expect(
      updatePlayer.execute({
        id: "2",
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
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to update a player if position don't exists", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const teamsRepository = new InMemoryTeamsRepository();
    const positionsRepository = new InMemoryPositionsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const updatePlayer = new UpdatePlayerService(
      playersRepository,
      teamsRepository,
      positionsRepository,
      usersRepository
    );
    const createPlayer = new CreatePlayerService(
      playersRepository,
      teamsRepository,
      positionsRepository,
      usersRepository
    );
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createPositionService = new CreatePositionService(
      positionsRepository
    );
    const createUserService = new CreateUserService(usersRepository);

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

    await createPlayer.execute({
      id: "1",
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

    await expect(
      updatePlayer.execute({
        id: "1",
        name: "Kevin de Bruyne",
        birthdate: "1991-08-01",
        lenght: 181,
        weight: 68,
        jersey: 17,
        positionId: "2",
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
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to update a player if team don't exists", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const teamsRepository = new InMemoryTeamsRepository();
    const positionsRepository = new InMemoryPositionsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const updatePlayer = new UpdatePlayerService(
      playersRepository,
      teamsRepository,
      positionsRepository,
      usersRepository
    );
    const createPlayer = new CreatePlayerService(
      playersRepository,
      teamsRepository,
      positionsRepository,
      usersRepository
    );
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createPositionService = new CreatePositionService(
      positionsRepository
    );
    const createUserService = new CreateUserService(usersRepository);

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

    await createPlayer.execute({
      id: "1",
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

    await expect(
      updatePlayer.execute({
        id: "1",
        name: "Kevin de Bruyne",
        birthdate: "1991-08-01",
        lenght: 181,
        weight: 68,
        jersey: 17,
        positionId: "1",
        teamId: "2",
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
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to update a player if user don't exists", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const teamsRepository = new InMemoryTeamsRepository();
    const positionsRepository = new InMemoryPositionsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const updatePlayer = new UpdatePlayerService(
      playersRepository,
      teamsRepository,
      positionsRepository,
      usersRepository
    );
    const createPlayer = new CreatePlayerService(
      playersRepository,
      teamsRepository,
      positionsRepository,
      usersRepository
    );
    const createTeam = new CreateTeamService(teamsRepository, usersRepository);
    const createPositionService = new CreatePositionService(
      positionsRepository
    );
    const createUserService = new CreateUserService(usersRepository);

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

    await createPlayer.execute({
      id: "1",
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

    await expect(
      updatePlayer.execute({
        id: "1",
        name: "Kevin de Bruyne",
        birthdate: "1991-08-01",
        lenght: 181,
        weight: 68,
        jersey: 17,
        positionId: "1",
        teamId: "1",
        userId: "2",
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
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
