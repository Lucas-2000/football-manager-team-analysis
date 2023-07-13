import { InMemoryPositionsRepository } from "./../../../repositories/inMemory/inMemoryPositionsRepository";
import { describe, expect, it } from "vitest";
import { CreatePositionService } from "../create/createPositionService";
import { FindAllPositionsService } from "./findAllPositionsService";
import {
  EnumPlayerPositionBase,
  EnumPlayerPositionRole,
  EnumRoleType,
} from "@prisma/client";

describe("Find all Positions Service", () => {
  it("should be able to find all positions", async () => {
    const positionsRepository = new InMemoryPositionsRepository();
    const createPositionService = new CreatePositionService(
      positionsRepository
    );
    const findAllPositionsService = new FindAllPositionsService(
      positionsRepository
    );

    const position = await createPositionService.execute({
      id: "1",
      basePosition: EnumPlayerPositionBase.Midfielder,
      positionRole: EnumPlayerPositionRole.AttackingMidfielder,
      roleType: [EnumRoleType.Attack, EnumRoleType.Support],
    });

    await expect(findAllPositionsService.execute()).resolves.toEqual([
      position,
    ]);
  });
});
