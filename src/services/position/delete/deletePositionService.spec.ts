import { InMemoryPositionsRepository } from "../../../repositories/inMemory/inMemoryPositionsRepository";
import { describe, expect, it } from "vitest";
import { EnumPlayerPositionBase } from "../../../utils/dicts/enumPlayerPositionBase";
import { EnumPlayerPositionRole } from "../../../utils/dicts/enumPlayerPositionRole";
import { EnumRoleType } from "../../../utils/dicts/enumRoleType";
import { Position } from "../../../entities/position";
import { CreatePositionService } from "../create/createPositionService";
import { DeletePositionService } from "./deletePositionService";

describe("Delete Position Service", () => {
  it("should be able to delete a position", async () => {
    const positionsRepository = new InMemoryPositionsRepository();
    const createPositionService = new CreatePositionService(
      positionsRepository
    );
    const deletePositionRespository = new DeletePositionService(
      positionsRepository
    );

    await createPositionService.execute({
      positionId: "1",
      basePosition: EnumPlayerPositionBase.Midfielder,
      positionRole: EnumPlayerPositionRole.AttackingMidfielder,
      roleType: [EnumRoleType.Attack, EnumRoleType.Support],
    });

    await expect(
      deletePositionRespository.execute({
        positionId: "1",
      })
    ).resolves.toBeInstanceOf(Array);
  });

  it("should not be able to delete a position if position already exists", async () => {
    const positionsRepository = new InMemoryPositionsRepository();
    const createPositionService = new CreatePositionService(
      positionsRepository
    );
    const deletePositionRespository = new DeletePositionService(
      positionsRepository
    );

    await createPositionService.execute({
      positionId: "1",
      basePosition: EnumPlayerPositionBase.Midfielder,
      positionRole: EnumPlayerPositionRole.AttackingMidfielder,
      roleType: [EnumRoleType.Attack, EnumRoleType.Support],
    });

    await expect(
      deletePositionRespository.execute({
        positionId: "2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
