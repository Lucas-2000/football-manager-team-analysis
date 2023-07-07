import { Team } from "../../../entities/team";
import { EnumTeamGrade } from "../../../utils/dicts/enumTeamGrade";
import { TeamsRepository } from "./../../../repositories/teamsRepository";

interface UpdateTeamRequest {
  teamId: string;
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamGrade: EnumTeamGrade;
}

type UpdateTeamResponse = Team;

export class UpdateTeamService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute({
    teamId,
    teamName,
    teamLocalization,
    teamCountry,
    teamGrade,
  }: UpdateTeamRequest): Promise<UpdateTeamResponse> {
    const verifyIndex = await this.teamsRepository.findIndex(teamId);

    if (verifyIndex < 0) throw new Error("Team not found!");

    const team = new Team({
      teamId,
      teamName,
      teamLocalization,
      teamCountry,
      teamGrade,
    });

    await this.teamsRepository.update(team, verifyIndex);

    return team;
  }
}
