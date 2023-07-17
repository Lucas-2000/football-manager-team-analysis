import { Team, TeamProps } from "../../../entities/team";
import { TeamsRepository } from "../../../repositories/teamsRepository";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";

interface CreateTeamRequest {
  id?: string;
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamLeague: string;
  teamGrade: EnumTeamGrade;
  teamLogo?: string;
  userId: string;
}

type CreateTeamResponse = TeamProps;

export class CreateTeamService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute({
    id,
    teamName,
    teamLocalization,
    teamCountry,
    teamGrade,
    teamLeague,
    teamLogo,
    userId,
  }: CreateTeamRequest): Promise<CreateTeamResponse> {
    const verifyExisting = await this.teamsRepository.verifyExisting(teamName);

    if (verifyExisting) throw new Error(`Team ${teamName} already exists!`);

    if ((await this.teamsRepository.checkTeamGradeInterval(teamGrade)) == false)
      throw new Error("Incorrect Team Grade Interval!");

    const team = new Team({
      id,
      teamName,
      teamLocalization,
      teamCountry,
      teamGrade,
      teamLeague,
      teamLogo,
      userId,
    });

    await this.teamsRepository.create(team);

    return team.getSummary();
  }
}
