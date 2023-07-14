import { Position, PositionProps } from "../../../entities/position";
import { PositionsRepository } from "../../../repositories/positionsRepository";
import { EnumPlayerPositionBase } from "../../../utils/dicts/enumPlayerPositionBase";
import { EnumPlayerPositionRole } from "../../../utils/dicts/enumPlayerPositionRole";
import { EnumRoleType } from "../../../utils/dicts/enumRoleType";

interface UpdatePositionServiceRequest {
  id: string;
  basePosition: EnumPlayerPositionBase;
  positionRole: EnumPlayerPositionRole;
  roleType: EnumRoleType[];
}

type UpdatePositionServiceResponse = PositionProps;

export class UpdatePositionService {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute({
    id,
    basePosition,
    positionRole,
    roleType,
  }: UpdatePositionServiceRequest): Promise<UpdatePositionServiceResponse> {
    const index = await this.positionsRepository.findIndex(id);

    if (index < 0) throw new Error("Position not found!");

    const position = new Position({
      id,
      basePosition,
      positionRole,
      roleType,
    });

    await this.positionsRepository.update(position);

    return position.getSummary();
  }
}
