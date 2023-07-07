import { TeamsRepository } from "./../../../repositories/teamsRepository";
import { Team } from "./../../../entities/team";
interface FindTeamByIdRequest {
  teamId: string;
}

type FindTeamByIdResponse = Team;

export class FindTeamByIdService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute({
    teamId,
  }: FindTeamByIdRequest): Promise<FindTeamByIdResponse> {
    const team = await this.teamsRepository.findTeamById(teamId);

    if (!team) {
      throw new Error("Team not found!");
    }

    return team;
  }
}
