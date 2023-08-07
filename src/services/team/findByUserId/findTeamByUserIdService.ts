import { TeamsRepository } from "../../../repositories/teamsRepository";
import { TeamProps } from "../../../entities/team";
import { UsersRepository } from "../../../repositories/usersRepository";

interface FindTeamByIdRequest {
  userId: string;
}

type FindTeamByIdResponse = TeamProps[];

export class FindTeamByUserIdService {
  constructor(
    private teamsRepository: TeamsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: FindTeamByIdRequest): Promise<FindTeamByIdResponse> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new Error("User not found");

    const teams = await this.teamsRepository.findByUserId(userId);

    if (!teams) {
      throw new Error("Team not found!");
    }

    const teamsSummaries: TeamProps[] = teams.map((team) => team.getSummary());

    return teamsSummaries;
  }
}
