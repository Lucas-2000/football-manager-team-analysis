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

    await this.teamsRepository.delete(id);

    return [];
  }
}
