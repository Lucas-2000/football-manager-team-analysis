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
    return this.players;
  }

  async findById(playerId: string): Promise<Player | undefined> {
    const player = this.players.find((p) => p.playerId === playerId);

    return player;
  }

  async findIndex(playerId: string): Promise<number> {
    const index = this.players.findIndex((p) => p.playerId === playerId);

    if (index < 0) return -1;

    return index;
  }

  async update(player: Player, playerIndex: number): Promise<void> {
    this.players.splice(playerIndex, 1);

    this.players.push(player);
  }

  async delete(playerIndex: number): Promise<void> {
    this.players.splice(playerIndex, 1);
  }
}
