import { Team } from "../../entities/team";
import { TeamsRepository } from "../teamsRepository";

export class InMemoryTeamsRepository implements TeamsRepository {
  public teams: Team[] = [];

  async create(team: Team): Promise<void> {
    this.teams.push(team);
  }

  async verifyExisting(teamName: string): Promise<boolean> {
    const existingTeam = this.teams.find((team) => {
      return team.teamName === teamName;
    });

    if (!existingTeam) return false;

    return true;
  }

  async findAll(): Promise<Team[]> {
    return this.teams;
  }

  async findById(teamId: string): Promise<Team | undefined> {
    const team = this.teams.find((team) => team.id === teamId);

    return team;
  }

  async findIndex(teamId: string): Promise<number> {
    const teamIndex = this.teams.findIndex((obj) => obj.id === teamId);

    if (teamIndex < 0) return -1;

    return teamIndex;
  }

  async update(team: Team, teamIndex: number): Promise<void> {
    this.teams.splice(teamIndex, 1);

    this.teams.push(team);
  }

  async delete(teamIndex: number): Promise<void> {
    this.teams.splice(teamIndex, 1);
  }
}
