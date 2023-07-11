import { PositionsRepository } from "../../../repositories/positionsRepository";

interface DeletePositionServiceRequest {
  positionId: string;
}

type DeletePlayerServiceResponse = [];

export class DeletePositionService {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute({
    positionId,
  }: DeletePositionServiceRequest): Promise<DeletePlayerServiceResponse> {
    const index = await this.positionsRepository.findIndex(positionId);

    if (index < 0) throw new Error("Position not found!");

    await this.positionsRepository.delete(index);

    return [];
  }
}
