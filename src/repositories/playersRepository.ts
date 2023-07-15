import { EnumPlayerAttributesRange } from "../utils/dicts/enumPlayerAttributesRange";
import { Player } from "./../entities/player";

export interface PlayersRepository {
  create(player: Player): Promise<void>;
  verifyExists(playerName: string, teamId: string): Promise<boolean>;
  findAll(): Promise<Player[]>;
  findById(playerId: string): Promise<Player | undefined>;
  findIndex(playerId: string): Promise<number>;
  update(player: Player): Promise<void>;
  delete(playerId: string): Promise<void>;
  checkAttributeInteval(attribute: EnumPlayerAttributesRange): Promise<boolean>;
}
