import { PlayerProps } from "../../../entities/player";
import { PlayersRepository } from "../../../repositories/playersRepository";
import { TeamsRepository } from "../../../repositories/teamsRepository";
import { UsersRepository } from "../../../repositories/usersRepository";

interface FindAllPlayersForUserAndTeamServiceRequest {
  userId: string;
  teamId: string;
}

type FindAllPlayersForUserAndTeamServiceResponse = PlayerProps[];

export class FindAllPlayersForUserAndTeamService {
  constructor(
    private playersRepository: PlayersRepository,
    private usersRepository: UsersRepository,
    private teamsRepository: TeamsRepository
  ) {}

  async execute({
    userId,
    teamId,
  }: FindAllPlayersForUserAndTeamServiceRequest): Promise<FindAllPlayersForUserAndTeamServiceResponse> {
    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new Error("User not found");

    const teamExists = await this.teamsRepository.findById(teamId);

    if (!teamExists) throw new Error("Team not found");

    const players = await this.playersRepository.findAllPlayersForUserAndTeam(
      userExists.id as string,
      teamExists.id as string
    );

    const playerSummaries: PlayerProps[] = players.map((player) =>
      player.getSummary()
    );

    return playerSummaries;
  }
}
