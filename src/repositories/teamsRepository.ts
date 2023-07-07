import { Team } from "../entities/team";

export interface TeamsRepository {
  create(team: Team): Promise<void>;
  verifyExisting(teamName: string): Promise<boolean>;
  findAll(): Promise<Team[]>;
  findById(teamId: string): Promise<Team | undefined>;
  findIndex(teamId: string): Promise<number>;
  update(team: Team, teamIndex: number): Promise<void>;
}
