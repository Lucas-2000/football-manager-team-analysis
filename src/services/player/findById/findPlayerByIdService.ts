import { Player } from "../../../entities/player";
import { PlayersRepository } from "./../../../repositories/playersRepository";

interface FindPlayerByIdRequest {
  id: string;
}

type FindPlayerByIdResponse = Player | undefined;

export class FindPlayerByIdService {
  constructor(private playersRepository: PlayersRepository) {}

  async execute({
    id,
  }: FindPlayerByIdRequest): Promise<FindPlayerByIdResponse> {
    const player = await this.playersRepository.findById(id);

    if (!player) throw new Error("Player not found!");

    return player;
  }
}
