import { Position } from "../../entities/position";
import { EnumPlayerPositionBase } from "../../utils/dicts/enumPlayerPositionBase";
import { PositionsRepository } from "../positionsRepository";

export class InMemoryPositionsRepository implements PositionsRepository {
  public positions: Position[] = [];

  async create(position: Position): Promise<void> {
    this.positions.push(position);
  }

  async findAll(): Promise<Position[]> {
    return this.positions;
  }

  async findByBasePosition(
    basePosition: EnumPlayerPositionBase
  ): Promise<Position[]> {
    const position = this.positions.filter(
      (p) => p.basePosition === basePosition
    );

    return position;
  }
  async verifyExists(positionId: string): Promise<boolean> {
    const positionExists = this.positions.find(
      (p) => p.positionId === positionId
    );

    if (positionExists) return true;

    return false;
  }

  async findIndex(positionId: string): Promise<number> {
    const index = this.positions.findIndex((p) => p.positionId === positionId);

    if (index < 0) return -1;

    return index;
  }

  async update(position: Position, positionIndex: number): Promise<void> {
    this.positions.splice(positionIndex, 1);

    this.positions.push(position);
  }

  async delete(positionIndex: number): Promise<void> {
    this.positions.splice(positionIndex, 1);
  }
}
