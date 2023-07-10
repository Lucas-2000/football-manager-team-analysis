import { expect, test } from "vitest";
import { Position } from "./position";
import { EnumPlayerPositionBase } from "../utils/dicts/enumPlayerPositionBase";
import { EnumPlayerPositionRole } from "../utils/dicts/enumPlayerPositionRole";
import { EnumRoleType } from "../utils/dicts/enumRoleType";

test("create a position", () => {
  const position = new Position({
    positionId: "1",
    basePosition: EnumPlayerPositionBase.Midfielder,
    positionRole: EnumPlayerPositionRole.AttackingMidfielder,
    roleType: [EnumRoleType.Attack, EnumRoleType.Support],
  });

  expect(position).instanceOf(Position);
  expect(position.basePosition).toEqual("Midfielder");
});
