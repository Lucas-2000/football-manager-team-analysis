import { EnumTeamGrade } from "@prisma/client";
import { TeamProps } from "../../../entities/team";
import { TeamsRepository } from "../../../repositories/teamsRepository";

export interface TeamSummary {
  id?: string;
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamLeague: string;
  teamGrade: EnumTeamGrade;
  teamLogo: string | null;
}

type FindAllTeamsResponse = TeamSummary[];

export class FindAllTeamsService {
  constructor(private teamsRepository: TeamsRepository) {}
  async execute(): Promise<FindAllTeamsResponse> {
    const teams = await this.teamsRepository.findAll();

    const teamSummaries: TeamProps[] = teams.map((team) => team.getSummary());

    return teamSummaries;
  }
}
