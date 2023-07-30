import { Team } from "../../entities/team";
import { EnumTeamGrade } from "../../utils/dicts/enumTeamGrade";
import { TeamsRepository } from "../teamsRepository";

export class InMemoryTeamsRepository implements TeamsRepository {
  public teams: Team[] = [];

  async create(team: Team): Promise<void> {
    this.teams.push(team);
  }

  async verifyExisting(teamName: string, userId: string): Promise<boolean> {
    const existingTeam = this.teams.find((team) => {
      return team.teamName === teamName && team.userId === userId;
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

  async findByUserId(userId: string): Promise<Team[] | undefined> {
    const team = this.teams.filter((team) => team.userId === userId);

    return team;
  }

  async findIndex(teamId: string): Promise<number> {
    const teamIndex = this.teams.findIndex((obj) => obj.id === teamId);

    if (teamIndex < 0) return -1;

    return teamIndex;
  }

  async update(team: Team): Promise<void> {
    const teamToUpdate = this.teams.find((t) => t.id === team.id);

    if (teamToUpdate !== undefined) {
      Object.assign(teamToUpdate, team);
    }
  }

  async delete(teamId: string): Promise<void> {
    const teamIndex = this.teams.findIndex((team) => team.id === teamId);

    if (teamIndex !== -1) {
      this.teams.splice(teamIndex, 1);
    }
  }

  async checkTeamGradeInterval(teamGrade: EnumTeamGrade): Promise<boolean> {
    if (["A", "B", "C", "D", "E"].includes(teamGrade)) return true;

    return false;
  }
}
