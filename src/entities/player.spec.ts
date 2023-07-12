import { expect, test } from "vitest";
import { Player } from "./player";
import { EnumPlayerAttributesRange } from "../utils/dicts/enumPlayerAttributesRange";

test("create a player", () => {
  const player = new Player({
    id: "1",
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

  expect(player).instanceOf(Player);
  expect(player.name).toEqual("Kevin de Bruyne");
});
