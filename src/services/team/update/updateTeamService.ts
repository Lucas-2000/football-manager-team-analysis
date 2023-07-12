import { Team } from "../../../entities/team";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";
import { TeamsRepository } from "./../../../repositories/teamsRepository";

interface UpdateTeamRequest {
  id: string;
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamLeague: string;
  teamGrade: EnumTeamGrade;
  teamLogo: string;
}

type UpdateTeamResponse = Team;

export class UpdateTeamService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute({
    id,
    teamName,
    teamLocalization,
    teamCountry,
    teamLeague,
    teamGrade,
    teamLogo,
  }: UpdateTeamRequest): Promise<UpdateTeamResponse> {
    const verifyIndex = await this.teamsRepository.findIndex(id);

    if (verifyIndex < 0) throw new Error("Team not found!");

    const team = new Team({
      id,
      teamName,
      teamLocalization,
      teamCountry,
      teamLeague,
      teamGrade,
      teamLogo,
    });

    await this.teamsRepository.update(team, verifyIndex);

    return team;
  }
}
