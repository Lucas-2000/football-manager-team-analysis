import { PositionsRepository } from "../../../repositories/positionsRepository";

interface DeletePositionServiceRequest {
  id: string;
}

type DeletePlayerServiceResponse = [];

export class DeletePositionService {
  constructor(private positionsRepository: PositionsRepository) {}

  async execute({
    id,
  }: DeletePositionServiceRequest): Promise<DeletePlayerServiceResponse> {
    const index = await this.positionsRepository.findIndex(id);

    if (index < 0) throw new Error("Position not found!");

    await this.positionsRepository.delete(index);

    return [];
  }
}
