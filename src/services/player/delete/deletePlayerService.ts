import { PlayersRepository } from "./../../../repositories/playersRepository";

interface DeletePlayerRequest {
  id: string;
}

type DeletePlayerResponse = [];

export class DeletePlayerService {
  constructor(private playersRepository: PlayersRepository) {}

  async execute({ id }: DeletePlayerRequest): Promise<DeletePlayerResponse> {
    const playerIndex = await this.playersRepository.findIndex(id);

    if (playerIndex < 0) throw new Error("Player not found!");

    this.playersRepository.delete(id);

    return [];
  }
}
