import { Position } from "../entities/position";
import { EnumPlayerPositionBase } from "../utils/dicts/enumPlayerPositionBase";

export interface PositionsRepository {
  create(position: Position): Promise<void>;
  findAll(): Promise<Position[]>;
  findByBasePosition(basePosition: EnumPlayerPositionBase): Promise<Position[]>;
  verifyExists(positionId: string): Promise<boolean>;
  findIndex(positionId: string): Promise<number>;
  update(position: Position, positionIndex: number): Promise<void>;
  delete(positionIndex: number): Promise<void>;
}
