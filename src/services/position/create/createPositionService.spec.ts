import { InMemoryPositionsRepository } from "./../../../repositories/inMemory/inMemoryPositionsRepository";
import { describe, expect, it } from "vitest";
import { CreatePositionService } from "./createPositionService";
import {
  EnumPlayerPositionBase,
  EnumPlayerPositionRole,
  EnumRoleType,
} from "@prisma/client";

describe("Create Position Service", () => {
  it("should be able to create a position", async () => {
    const positionsRepository = new InMemoryPositionsRepository();
    const createPositionService = new CreatePositionService(
      positionsRepository
    );

    await expect(
      createPositionService.execute({
        id: "1",
        basePosition: EnumPlayerPositionBase.Midfielder,
        positionRole: EnumPlayerPositionRole.AttackingMidfielder,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to create a position if position already exists", async () => {
    const positionsRepository = new InMemoryPositionsRepository();
    const createPositionService = new CreatePositionService(
      positionsRepository
    );

    await createPositionService.execute({
      id: "1",
      basePosition: EnumPlayerPositionBase.Midfielder,
      positionRole: EnumPlayerPositionRole.AttackingMidfielder,
      roleType: [EnumRoleType.Attack, EnumRoleType.Support],
    });

    await expect(
      createPositionService.execute({
        id: "1",
        basePosition: EnumPlayerPositionBase.Midfielder,
        positionRole: EnumPlayerPositionRole.AttackingMidfielder,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
