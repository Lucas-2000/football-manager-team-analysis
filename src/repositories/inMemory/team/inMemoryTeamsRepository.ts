import { Team } from "../../../entities/team";
import { TeamsRepository } from "../../teamsRepository";

export class InMemoryTeamsRepository implements TeamsRepository {
  public teams: Team[] = [];

  async create(team: Team): Promise<void> {
    this.teams.push(team);
  }

  async verifyExistingTeam(teamName: string): Promise<boolean> {
    const existingTeam = this.teams.find((team) => {
      return team.teamName === teamName;
    });

    if (!existingTeam) return false;

    return true;
  }

  async findAllTeams(): Promise<Team[]> {
    return this.teams;
  }

  async findTeamById(teamId: string): Promise<Team | undefined> {
    const team = this.teams.find((team) => team.teamId === teamId);

    return team;
  }
}
