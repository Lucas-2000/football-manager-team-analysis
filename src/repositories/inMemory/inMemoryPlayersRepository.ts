import { Player } from "../../entities/player";
import { PlayersRepository } from "../playersRepository";

export class InMemoryPlayersRepository implements PlayersRepository {
  public players: Player[] = [];

  async create(player: Player): Promise<void> {
    this.players.push(player);
  }

  async verifyExists(playerName: string): Promise<boolean> {
    const playerExists = this.players.find((p) => p.name === playerName);

    if (playerExists) return true;

    return false;
  }

  async findAll(): Promise<Player[]> {
    return this.players
  }
}
