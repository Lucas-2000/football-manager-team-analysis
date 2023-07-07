import { Team } from "../../../entities/team";
import { TeamsRepository } from "../../../repositories/teamsRepository";

type FindAllTeamsResponse = Team[];

export class FindAllTeamsService {
  constructor(private teamsRepository: TeamsRepository) {}
  async execute(): Promise<FindAllTeamsResponse> {
    return await this.teamsRepository.findAllTeams();
  }
}
