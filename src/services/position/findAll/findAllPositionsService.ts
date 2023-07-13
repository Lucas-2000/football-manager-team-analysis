import { PositionProps } from "../../../entities/position";
import { PositionsRepository } from "./../../../repositories/positionsRepository";

type FindAllPositionsServiceResponse = PositionProps[];

export class FindAllPositionsService {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute(): Promise<FindAllPositionsServiceResponse> {
    const positions = await this.positionsRepository.findAll();

    const positionsSummaries: PositionProps[] = positions.map((position) =>
      position.getSummary()
    );

    return positionsSummaries;
  }
}
