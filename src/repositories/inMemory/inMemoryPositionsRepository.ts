import { EnumPlayerPositionRole, EnumRoleType } from "@prisma/client";
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

  async findById(positionId: string): Promise<Position | undefined> {
    const position = this.positions.find((p) => p.id === positionId);

    return position;
  }

  async verifyExists(
    basePosition: EnumPlayerPositionBase,
    positionRole: EnumPlayerPositionRole,
    roleType: EnumRoleType[]
  ): Promise<boolean> {
    const positionExists = this.positions.some((p) => {
      return (
        p.basePosition === basePosition &&
        p.positionRole === positionRole &&
        JSON.stringify(p.roleType) === JSON.stringify(roleType)
      );
    });

    return positionExists;
  }

  async findIndex(positionId: string): Promise<number> {
    const index = this.positions.findIndex((p) => p.id === positionId);

    if (index < 0) return -1;

    return index;
  }

  async update(position: Position): Promise<void> {
    const positionToUpdate = this.positions.find((p) => p.id === position.id);

    if (positionToUpdate !== undefined) {
      Object.assign(positionToUpdate, position);
    }
  }

  async delete(positionId: string): Promise<void> {
    const positionIndex = this.positions.findIndex(
      (positions) => positions.id === positionId
    );

    if (positionIndex !== -1) {
      this.positions.splice(positionIndex, 1);
    }
  }
}
