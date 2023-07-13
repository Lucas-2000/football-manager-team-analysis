import { EnumPlayerPositionBase } from "@prisma/client";
import { Position } from "../../entities/position";
import { prisma } from "../../prisma/prismaClient";
import { PositionsRepository } from "../positionsRepository";
import { v4 as uuid } from "uuid";

export class PrismaPositionsRepository implements PositionsRepository {
  async create({
    basePosition,
    positionRole,
    roleType,
  }: Position): Promise<void> {
    await prisma.position.create({
      data: {
        id: uuid(),
        basePosition,
        positionRole,
        roleType,
      },
    });
  }

  async findAll(): Promise<Position[]> {
    const positions = await prisma.position.findMany();

    return positions.map(
      (position) =>
        new Position({
          id: position.id,
          basePosition: position.basePosition,
          positionRole: position.positionRole,
          roleType: position.roleType,
        })
    );
  }

  async findByBasePosition(
    basePosition: EnumPlayerPositionBase
  ): Promise<Position[]> {
    const positions = await prisma.position.findMany({
      where: {
        basePosition,
      },
    });

    return positions.map(
      (position) =>
        new Position({
          id: position.id,
          basePosition: position.basePosition,
          positionRole: position.positionRole,
          roleType: position.roleType,
        })
    );
  }

  async verifyExists(positionId: string): Promise<boolean> {
    const position = await prisma.position.findUnique({
      where: {
        id: positionId,
      },
    });

    return !!position;
  }

  async findIndex(positionId: string): Promise<number> {
    const positions = await prisma.position.findMany();

    const positionIndex = positions.findIndex(
      (position) => position.id === positionId
    );

    if (positionIndex < 0) return -1;

    return positionIndex;
  }

  async update({
    id,
    basePosition,
    positionRole,
    roleType,
  }: Position): Promise<void> {
    await prisma.position.update({
      where: { id },
      data: {
        basePosition,
        positionRole,
        roleType,
      },
    });
  }

  async delete(positionId: string): Promise<void> {
    await prisma.position.delete({
      where: { id: positionId },
    });
  }
}
