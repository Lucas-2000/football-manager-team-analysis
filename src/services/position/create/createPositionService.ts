import { Position, PositionProps } from "../../../entities/position";
import { EnumPlayerPositionBase } from "../../../utils/dicts/enumPlayerPositionBase";
import { EnumPlayerPositionRole } from "../../../utils/dicts/enumPlayerPositionRole";
import { EnumRoleType } from "../../../utils/dicts/enumRoleType";
import { PositionsRepository } from "./../../../repositories/positionsRepository";

interface CreatePositionRequest {
  id?: string;
  basePosition: EnumPlayerPositionBase;
  positionRole: EnumPlayerPositionRole;
  roleType: EnumRoleType[];
}

type CreatePositionResponse = PositionProps;

export class CreatePositionService {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute({
    id,
    basePosition,
    positionRole,
    roleType,
  }: CreatePositionRequest): Promise<CreatePositionResponse> {
    const positionExists = await this.positionsRepository.verifyExists(
      basePosition,
      positionRole,
      roleType
    );

    if (positionExists) throw new Error("Position already exists!");

    const position = new Position({
      id,
      basePosition,
      positionRole,
      roleType,
    });

    await this.positionsRepository.create(position);

    return position.getSummary();
  }
}
