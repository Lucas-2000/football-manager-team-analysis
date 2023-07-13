import { TeamProps } from "../../../entities/team";
import { TeamsRepository } from "../../../repositories/teamsRepository";

type FindAllTeamsResponse = TeamProps[];

export class FindAllTeamsService {
  constructor(private teamsRepository: TeamsRepository) {}
  async execute(): Promise<FindAllTeamsResponse> {
    const teams = await this.teamsRepository.findAll();

    const teamSummaries: TeamProps[] = teams.map((team) => team.getSummary());

    return teamSummaries;
  }
}
