import { Player } from "../../../entities/player"
import { PlayersRepository } from "../../../repositories/playersRepository";

type FindAllPlayersResponse = Player[];

export class FindAllPlayersService {
  constructor(private playersRepository: PlayersRepository) {}

  async execute(): Promise<FindAllPlayersResponse> {
    return await this.playersRepository.findAll()
  }
}