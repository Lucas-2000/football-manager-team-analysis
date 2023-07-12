import { InMemoryPositionsRepository } from "./../../../repositories/inMemory/inMemoryPositionsRepository";
import { describe, expect, it } from "vitest";
import { EnumPlayerPositionBase } from "../../../utils/dicts/enumPlayerPositionBase";
import { EnumPlayerPositionRole } from "../../../utils/dicts/enumPlayerPositionRole";
import { EnumRoleType } from "../../../utils/dicts/enumRoleType";
import { Position } from "../../../entities/position";
import { CreatePositionService } from "../create/createPositionService";
import { UpdatePositionService } from "./updatePositionService";

describe("Update Position Service", () => {
  it("should be able to update a position", async () => {
    const positionsRepository = new InMemoryPositionsRepository();
    const createPositionService = new CreatePositionService(
      positionsRepository
    );
    const updatePositionService = new UpdatePositionService(
      positionsRepository
    );

    await createPositionService.execute({
      id: "1",
      basePosition: EnumPlayerPositionBase.Midfielder,
      positionRole: EnumPlayerPositionRole.AttackingMidfielder,
      roleType: [EnumRoleType.Attack, EnumRoleType.Support],
    });

    await expect(
      updatePositionService.execute({
        id: "1",
        basePosition: EnumPlayerPositionBase.Striker,
        positionRole: EnumPlayerPositionRole.AttackingMidfielder,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      })
    ).resolves.toBeInstanceOf(Position);
  });

  it("should not be able to update a position if position don't exists", async () => {
    const positionsRepository = new InMemoryPositionsRepository();
    const createPositionService = new CreatePositionService(
      positionsRepository
    );
    const updatePositionService = new UpdatePositionService(
      positionsRepository
    );

    await createPositionService.execute({
      id: "1",
      basePosition: EnumPlayerPositionBase.Midfielder,
      positionRole: EnumPlayerPositionRole.AttackingMidfielder,
      roleType: [EnumRoleType.Attack, EnumRoleType.Support],
    });

    await expect(
      updatePositionService.execute({
        id: "2",
        basePosition: EnumPlayerPositionBase.Striker,
        positionRole: EnumPlayerPositionRole.AttackingMidfielder,
        roleType: [EnumRoleType.Attack, EnumRoleType.Support],
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
