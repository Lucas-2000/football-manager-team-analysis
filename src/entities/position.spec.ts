import { expect, test } from "vitest";
import { Position } from "./position";
import {
  EnumPlayerPositionBase,
  EnumPlayerPositionRole,
  EnumRoleType,
} from "@prisma/client";

test("create a position", () => {
  const position = new Position({
    id: "1",
    basePosition: EnumPlayerPositionBase.Midfielder,
    positionRole: EnumPlayerPositionRole.AttackingMidfielder,
    roleType: [EnumRoleType.Attack, EnumRoleType.Support],
  });

  expect(position).instanceOf(Position);
  expect(position.basePosition).toEqual("Midfielder");
});
