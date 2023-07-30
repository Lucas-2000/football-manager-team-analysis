import { TeamsRepository } from "../../../repositories/teamsRepository";
import { TeamProps } from "../../../entities/team";

interface FindTeamByIdRequest {
  userId: string;
}

type FindTeamByIdResponse = TeamProps[];

export class FindTeamByUserIdService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute({
    userId,
  }: FindTeamByIdRequest): Promise<FindTeamByIdResponse> {
    const teams = await this.teamsRepository.findByUserId(userId);

    if (!teams) {
      throw new Error("Team not found!");
    }

    const teamsSummaries: TeamProps[] = teams.map((team) => team.getSummary());

    return teamsSummaries;
  }
}
