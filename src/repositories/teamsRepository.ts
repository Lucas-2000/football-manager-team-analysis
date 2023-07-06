import { Team } from "../entities/team";

export interface TeamsRepository {
  create(team: Team): Promise<void>;
  verifyExistingTeam(teamName: string): Promise<boolean>;
}
