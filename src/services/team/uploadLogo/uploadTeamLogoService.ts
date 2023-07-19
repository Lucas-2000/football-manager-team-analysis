import fs from "fs/promises";
import path from "path";
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

    const uploadsFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "uploads"
    ); // Caminho base da pasta de uploads

    if (team.teamLogo) {
      const logoPath = path.join(uploadsFolder, team.teamLogo as string);
      await fs.unlink(logoPath);
    }

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
