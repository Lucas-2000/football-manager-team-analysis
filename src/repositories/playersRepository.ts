import { Player } from "./../entities/player";

export interface PlayersRepository {
  create(player: Player): Promise<void>;
  verifyExists(playerName: string): Promise<boolean>;
  findAll(): Promise<Player[]>;
  findById(playerId: string): Promise<Player | undefined>;
  findIndex(playerId: string): Promise<number>;
  update(player: Player, playerIndex: number): Promise<void>;
}
