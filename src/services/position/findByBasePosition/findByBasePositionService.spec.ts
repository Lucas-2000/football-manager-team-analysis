import { InMemoryPositionsRepository } from "./../../../repositories/inMemory/inMemoryPositionsRepository";
import { describe, expect, it } from "vitest";
import { EnumPlayerPositionBase } from "../../../utils/dicts/enumPlayerPositionBase";
import { EnumPlayerPositionRole } from "../../../utils/dicts/enumPlayerPositionRole";
import { EnumRoleType } from "../../../utils/dicts/enumRoleType";
import { CreatePositionService } from "../create/createPositionService";
import { FindByBasePositionService } from "./findByBasePositionService";

describe("Find by Base Position Service", () => {
  it("should be able to find by base position", async () => {
    const positionsRepository = new InMemoryPositionsRepository();
    const createPositionService = new CreatePositionService(
      positionsRepository
    );
    const findByBasePositionService = new FindByBasePositionService(
      positionsRepository
    );

    const position = await createPositionService.execute({
      positionId: "1",
      basePosition: EnumPlayerPositionBase.Midfielder,
      positionRole: EnumPlayerPositionRole.AttackingMidfielder,
      roleType: [EnumRoleType.Attack, EnumRoleType.Support],
    });

    await expect(
      findByBasePositionService.execute({
        basePosition: EnumPlayerPositionBase.Midfielder,
      })
    ).resolves.toEqual([position]);
  });

  it("should not be able to find by base position if base position don't exists", async () => {
    const positionsRepository = new InMemoryPositionsRepository();
    const createPositionService = new CreatePositionService(
      positionsRepository
    );
    const findByBasePositionService = new FindByBasePositionService(
      positionsRepository
    );

    await createPositionService.execute({
      positionId: "1",
      basePosition: EnumPlayerPositionBase.Midfielder,
      positionRole: EnumPlayerPositionRole.AttackingMidfielder,
      roleType: [EnumRoleType.Attack, EnumRoleType.Support],
    });

    await expect(
      findByBasePositionService.execute({
        basePosition: EnumPlayerPositionBase.Defenser,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
