import { Request, Response } from "express";
import { FindAllPlayersForUserAndTeamService } from "./findAllPlayersForUserAndTeamService";

export class FindAllPlayersForUserAndTeamController {
  constructor(
    private findAllPlayersForUserAndTeamService: FindAllPlayersForUserAndTeamService
  ) {}

  async handle(request: Request, response: Response) {
    const { userId, teamId } = request.params;

    const players = await this.findAllPlayersForUserAndTeamService.execute({
      userId,
      teamId,
    });

    return response.status(201).json(players);
  }
}
