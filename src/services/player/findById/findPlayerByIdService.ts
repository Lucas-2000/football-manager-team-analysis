import { Player } from "../../../entities/player";
import { PlayersRepository } from "./../../../repositories/playersRepository";

interface FindPlayerByIdRequest {
  playerId: string;
}

type FindPlayerByIdResponse = Player | undefined;

export class FindPlayerByIdService {
  constructor(private playersRepository: PlayersRepository) {}

  async execute({
    playerId,
  }: FindPlayerByIdRequest): Promise<FindPlayerByIdResponse> {
    const player = await this.playersRepository.findById(playerId);

    if (!player) throw new Error("Player not found!");

    return player;
  }
}
