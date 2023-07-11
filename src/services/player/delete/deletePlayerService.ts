import { Player } from "../../../entities/player";
import { PlayersRepository } from "./../../../repositories/playersRepository";

interface DeletePlayerRequest {
  playerId: string;
}

type DeletePlayerResponse = [];

export class DeletePlayerService {
  constructor(private playersRepository: PlayersRepository) {}

  async execute({
    playerId,
  }: DeletePlayerRequest): Promise<DeletePlayerResponse> {
    const playerIndex = await this.playersRepository.findIndex(playerId);

    if (playerIndex < 0) throw new Error("Player not found!");

    this.playersRepository.delete(playerIndex);

    return [];
  }
}
