import { EnumPlayerPositionRole, EnumRoleType } from "@prisma/client";
import { Position } from "../entities/position";
import { EnumPlayerPositionBase } from "../utils/dicts/enumPlayerPositionBase";

export interface PositionsRepository {
  create(position: Position): Promise<void>;
  findAll(): Promise<Position[]>;
  findByBasePosition(basePosition: EnumPlayerPositionBase): Promise<Position[]>;
  verifyExists(
    basePosition: EnumPlayerPositionBase,
    positionRole: EnumPlayerPositionRole,
    roleType: EnumRoleType[]
  ): Promise<boolean>;
  findIndex(positionId: string): Promise<number>;
  update(position: Position): Promise<void>;
  delete(positionId: string): Promise<void>;
}
