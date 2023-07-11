import { Position } from "../../../entities/position";
import { PositionsRepository } from "./../../../repositories/positionsRepository";

type FindAllPositionsServiceResponse = Position[];

export class FindAllPositionsService {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute(): Promise<FindAllPositionsServiceResponse> {
    const positions = await this.positionsRepository.findAll();

    return positions;
  }
}
