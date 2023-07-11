import { Team } from "../../../entities/team";
import { TeamsRepository } from "../../../repositories/teamsRepository";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";

interface CreateTeamRequest {
  teamId: string;
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamLeague: string;
  teamGrade: EnumTeamGrade;
  teamLogo: string;
}

type CreateTeamResponse = Team;

export class CreateTeamService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute({
    teamId,
    teamName,
    teamLocalization,
    teamCountry,
    teamGrade,
    teamLeague,
    teamLogo,
  }: CreateTeamRequest): Promise<CreateTeamResponse> {
    const verifyExisting = await this.teamsRepository.verifyExisting(teamName);

    if (verifyExisting) throw new Error(`Team ${teamName} already exists!`);

    const team = new Team({
      teamId,
      teamName,
      teamLocalization,
      teamCountry,
      teamGrade,
      teamLeague,
      teamLogo,
    });

    await this.teamsRepository.create(team);

    return team;
  }
}