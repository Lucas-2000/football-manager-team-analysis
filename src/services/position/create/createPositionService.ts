import { Position } from "../../../entities/position";
import { EnumPlayerPositionBase } from "../../../utils/dicts/enumPlayerPositionBase";
import { EnumPlayerPositionRole } from "../../../utils/dicts/enumPlayerPositionRole";
import { EnumRoleType } from "../../../utils/dicts/enumRoleType";
import { PositionsRepository } from "./../../../repositories/positionsRepository";

interface CreatePositionRequest {
  positionId: string;
  basePosition: EnumPlayerPositionBase;
  positionRole: EnumPlayerPositionRole;
  roleType: EnumRoleType[];
}

type CreatePositionResponse = Position;

export class CreatePositionService {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute({
    positionId,
    basePosition,
    positionRole,
    roleType,
  }: CreatePositionRequest): Promise<CreatePositionResponse> {
    const positionExists = await this.positionsRepository.verifyExists(
      positionId
    );

    if (positionExists) throw new Error("Position already exists!");

    const position = new Position({
      positionId,
      basePosition,
      positionRole,
      roleType,
    });

    await this.positionsRepository.create(position);

    return position;
  }
}
