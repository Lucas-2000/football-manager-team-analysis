import { Team } from "../entities/team";
import { EnumTeamGrade } from "../utils/dicts/enumTeamGrade";

export interface TeamsRepository {
  create(team: Team): Promise<void>;
  verifyExisting(teamName: string, userId: string): Promise<boolean>;
  findAll(): Promise<Team[]>;
  findById(teamId: string): Promise<Team | undefined>;
  findIndex(teamId: string): Promise<number>;
  update(team: Team): Promise<void>;
  delete(teamId: string): Promise<void>;
  checkTeamGradeInterval(teamGrade: EnumTeamGrade): Promise<boolean>;
}
