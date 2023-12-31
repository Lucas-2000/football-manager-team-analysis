import { Player } from "../../entities/player";
import { EnumPlayerAttributesRange } from "../../utils/dicts/enumPlayerAttributesRange";
import { PlayersRepository } from "../playersRepository";

export class InMemoryPlayersRepository implements PlayersRepository {
  public players: Player[] = [];

  async create(player: Player): Promise<void> {
    this.players.push(player);
  }

  async verifyExists(playerName: string, teamId: string): Promise<boolean> {
    const player = this.players.find(
      (p) => p.name === playerName && p.teamId === teamId
    );

    return !!player;
  }

  async findAll(): Promise<Player[]> {
    return this.players;
  }

  async findAllPlayersForUserAndTeam(
    userId: string,
    teamId: string
  ): Promise<Player[]> {
    const players = this.players.filter((p) => {
      return p.userId === userId && p.teamId === teamId;
    });

    return players;
  }

  async findById(playerId: string): Promise<Player | undefined> {
    const player = this.players.find((p) => p.id === playerId);

    return player;
  }

  async findIndex(playerId: string): Promise<number> {
    const index = this.players.findIndex((p) => p.id === playerId);

    if (index < 0) return -1;

    return index;
  }

  async update(player: Player): Promise<void> {
    const playerToUpdate = this.players.find((p) => p.id === player.id);

    if (playerToUpdate !== undefined) {
      Object.assign(playerToUpdate, player);
    }
  }

  async delete(playerId: string): Promise<void> {
    const playerIndex = this.players.findIndex(
      (players) => players.id === playerId
    );

    if (playerIndex !== -1) {
      this.players.splice(playerIndex, 1);
    }
  }

  async checkAttributeInteval(
    attribute: EnumPlayerAttributesRange
  ): Promise<boolean> {
    if (attribute < 0 || attribute > 20) return false;

    return true;
  }
}
