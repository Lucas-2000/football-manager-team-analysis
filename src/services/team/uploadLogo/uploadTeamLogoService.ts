import { Team, TeamProps } from "../../../entities/team";
import { TeamsRepository } from "../../../repositories/teamsRepository";

interface UploadTeamLogoRequest {
  id: string;
  teamLogo?: string;
}

type UploadTeamLogoResponse = TeamProps;

export class UploadTeamLogoService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute({
    id,
    teamLogo,
  }: UploadTeamLogoRequest): Promise<UploadTeamLogoResponse> {
    const team = await this.teamsRepository.findById(id);

    if (!team) throw new Error("Team not found!");

    if (!teamLogo) throw new Error("Team logo found!");

    const uploadLogo = new Team({
      id,
      teamName: team.teamName,
      teamLocalization: team.teamLocalization,
      teamCountry: team.teamCountry,
      teamLeague: team.teamLeague,
      teamGrade: team.teamGrade,
      userId: team.userId,
      teamLogo,
    });

    await this.teamsRepository.update(uploadLogo);

    return uploadLogo.getSummary();
  }
}
