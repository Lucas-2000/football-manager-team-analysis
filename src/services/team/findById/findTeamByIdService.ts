import { TeamsRepository } from "../../../repositories/teamsRepository";
import { Team } from "../../../entities/team";
interface FindTeamByIdRequest {
  id: string;
}

type FindTeamByIdResponse = Team;

export class FindTeamByIdService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute({ id }: FindTeamByIdRequest): Promise<FindTeamByIdResponse> {
    const team = await this.teamsRepository.findById(id);

    if (!team) {
      throw new Error("Team not found!");
    }

    return team;
  }
}
