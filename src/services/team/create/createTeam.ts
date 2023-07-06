import { Team } from "../../../entities/team";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";

interface CreateTeamRequest {
  teamId: string;
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamGrade: EnumTeamGrade;
}

type CreateTeamResponse = Team;

export class CreateTeam {
  async execute({
    teamId,
    teamName,
    teamLocalization,
    teamCountry,
    teamGrade,
  }: CreateTeamRequest): Promise<CreateTeamResponse> {
    const team = new Team({
      teamId,
      teamName,
      teamLocalization,
      teamCountry,
      teamGrade,
    });

    return team;
  }
}
