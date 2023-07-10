import { describe, expect, it } from "vitest";
import { InMemoryPlayersRepository } from "./../../../repositories/inMemory/inMemoryPlayersRepository";
import { FindPlayerByIdService } from "./findPlayerByIdService";
import { CreatePlayerService } from "./../create/createPlayerService";
import { EnumPlayerAttributesRange } from "../../../utils/dicts/enumPlayerAttributesRange";
import { Player } from "../../../entities/player";

describe("Find Player By Id", () => {
  it("should be able to find player by id", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const findPlayersByIdService = new FindPlayerByIdService(playersRepository);
    const createPlayerService = new CreatePlayerService(playersRepository);

    await createPlayerService.execute({
      playerId: "1",
      name: "Kevin de Bruyne",
      birthdate: new Date("1991-08-01"),
      lenght: 181,
      weight: 68,
      jersey: 17,
      positionId: "1",
      teamId: "1",
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
      findPlayersByIdService.execute({
        playerId: "1",
      })
    ).resolves.toBeInstanceOf(Player);
  });

  it("should not be able to find player by id if player don't exists", async () => {
    const playersRepository = new InMemoryPlayersRepository();
    const findPlayersByIdService = new FindPlayerByIdService(playersRepository);
    const createPlayerService = new CreatePlayerService(playersRepository);

    await createPlayerService.execute({
      playerId: "1",
      name: "Kevin de Bruyne",
      birthdate: new Date("1991-08-01"),
      lenght: 181,
      weight: 68,
      jersey: 17,
      positionId: "1",
      teamId: "1",
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
      findPlayersByIdService.execute({
        playerId: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
