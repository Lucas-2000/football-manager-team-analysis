import { TeamsRepository } from "./../../../repositories/teamsRepository";

interface DeleteTeamRequest {
  teamId: string;
}

type DeleteTeamResponse = [];

export class DeleteTeamService {
  constructor(private teamsRepository: TeamsRepository) {}

  async execute({ teamId }: DeleteTeamRequest): Promise<DeleteTeamResponse> {
    const verifyIndex = await this.teamsRepository.findIndex(teamId);

    if (verifyIndex < 0) throw new Error("Team not found!");

    await this.teamsRepository.delete(verifyIndex);

    return [];
  }
}
