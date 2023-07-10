import { expect, test } from "vitest";
import { Player } from "./player";
import { EnumPlayerAttributesRange } from "../utils/dicts/enumPlayerAttributesRange";
import { EnumPlayerPositionBase } from "../utils/dicts/enumPlayerPositionBase";
import { EnumPlayerPositionRole } from "../utils/dicts/enumPlayerPositionRole";
import { EnumRoleType } from "../utils/dicts/enumRoleType";

test("create a player", () => {
  const player = new Player({
    playerId: "1",
    name: "Kevin de Bruyne",
    birthdate: new Date("1991-08-01"),
    lenght: 181,
    weight: 68,
    jersey: 17,
    positionId: "1",
    basePosition: EnumPlayerPositionBase.Midfielder,
    positionRole: EnumPlayerPositionRole.AttackingMidfielder,
    roleType: [EnumRoleType.Attack, EnumRoleType.Support],
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
