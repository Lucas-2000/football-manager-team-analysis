import path from "path";
import fs from "fs/promises";
import { TeamsRepository } from "./../../../repositories/teamsRepository";

interface DeleteTeamRequest {
  id: string;
}

type DeleteTeamResponse = [];

export class DeleteTeamService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute({ id }: DeleteTeamRequest): Promise<DeleteTeamResponse> {
    const verifyIndex = await this.teamsRepository.findIndex(id);

    if (verifyIndex < 0) throw new Error("Team not found!");

    const team = await this.teamsRepository.findById(id);

    const teamLogo = team?.teamLogo;

    if (!teamLogo) {
      throw new Error("Team logo not found!");
    }

    const uploadsFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "uploads"
    ); // Caminho base da pasta de uploads
    const logoPath = path.join(uploadsFolder, teamLogo);

    await fs.unlink(logoPath);

    await this.teamsRepository.delete(id);

    return [];
  }
}
