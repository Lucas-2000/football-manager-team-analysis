import { PositionsRepository } from "./../../../repositories/positionsRepository";
import { Position } from "./../../../entities/position";
import { EnumPlayerPositionBase } from "./../../../utils/dicts/enumPlayerPositionBase";
interface FindByBasePositionRequest {
  basePosition: EnumPlayerPositionBase;
}

type FindByBasePositionResponse = Position[];

export class FindByBasePositionService {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute({
    basePosition,
  }: FindByBasePositionRequest): Promise<FindByBasePositionResponse> {
    const position = await this.positionsRepository.findByBasePosition(
      basePosition
    );

    if (position.length < 1) throw new Error("Base position not found!");

    return position;
  }
}
