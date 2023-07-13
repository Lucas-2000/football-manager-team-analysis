import { TeamsRepository } from "../../../repositories/teamsRepository";
import { TeamProps } from "../../../entities/team";

interface FindTeamByIdRequest {
  id: string;
}

type FindTeamByIdResponse = TeamProps;

export class FindTeamByIdService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute({ id }: FindTeamByIdRequest): Promise<FindTeamByIdResponse> {
    const team = await this.teamsRepository.findById(id);

    if (!team) {
      throw new Error("Team not found!");
    }

    const teamSummaries: TeamProps = team.getSummary();

    return teamSummaries;
  }
}
