import { PositionsRepository } from "./../../../repositories/positionsRepository";
import { PositionProps } from "./../../../entities/position";
import { EnumPlayerPositionBase } from "./../../../utils/dicts/enumPlayerPositionBase";
interface FindByBasePositionRequest {
  basePosition: EnumPlayerPositionBase;
}

type FindByBasePositionResponse = PositionProps[];

export class FindByBasePositionService {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute({
    basePosition,
  }: FindByBasePositionRequest): Promise<FindByBasePositionResponse> {
    const positions = await this.positionsRepository.findByBasePosition(
      basePosition
    );

    if (positions.length < 1) throw new Error("Position not found!");

    const positionSummaries: PositionProps[] = positions.map((position) =>
      position.getSummary()
    );

    return positionSummaries;
  }
}
