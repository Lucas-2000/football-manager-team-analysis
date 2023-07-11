import { Position } from "../../../entities/position";
import { PositionsRepository } from "../../../repositories/positionsRepository";
import { EnumPlayerPositionBase } from "../../../utils/dicts/enumPlayerPositionBase";
import { EnumPlayerPositionRole } from "../../../utils/dicts/enumPlayerPositionRole";
import { EnumRoleType } from "../../../utils/dicts/enumRoleType";

interface UpdatePositionServiceRequest {
  positionId: string;
  basePosition: EnumPlayerPositionBase;
  positionRole: EnumPlayerPositionRole;
  roleType: EnumRoleType[];
}

type UpdatePositionServiceResponse = Position;

export class UpdatePositionService {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute({
    positionId,
    basePosition,
    positionRole,
    roleType,
  }: UpdatePositionServiceRequest): Promise<UpdatePositionServiceResponse> {
    const index = await this.positionsRepository.findIndex(positionId);

    if (index < 0) throw new Error("Position not found!");

    const position = new Position({
      positionId,
      basePosition,
      positionRole,
      roleType,
    });

    await this.positionsRepository.update(position, index);

    return position;
  }
}
