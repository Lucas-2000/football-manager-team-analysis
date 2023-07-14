import { PlayerProps } from "../../../entities/player";
import { PlayersRepository } from "../../../repositories/playersRepository";

type FindAllPlayersResponse = PlayerProps[];

export class FindAllPlayersService {
  constructor(private playersRepository: PlayersRepository) {}

  async execute(): Promise<FindAllPlayersResponse> {
    const players = await this.playersRepository.findAll();

    const playerSummaries: PlayerProps[] = players.map((player) =>
      player.getSummary()
    );

    return playerSummaries;
  }
}
