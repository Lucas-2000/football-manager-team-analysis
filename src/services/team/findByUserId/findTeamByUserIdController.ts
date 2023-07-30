import { Request, Response } from "express";
import { FindTeamByUserIdService } from "./findTeamByUserIdService";

export class FindTeamByUserIdController {
  constructor(private findTeamByUserIdService: FindTeamByUserIdService) {}

  async handle(request: Request, response: Response) {
    const { userId } = request.params;

    const teams = await this.findTeamByUserIdService.execute({ userId });

    return response.status(201).json(teams);
  }
}
