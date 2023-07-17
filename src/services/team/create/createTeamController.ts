import { Request, Response } from "express";
import { CreateTeamService } from "./createTeamService";

export class CreateTeamController {
  constructor(private createTeamService: CreateTeamService) {}

  async handle(request: Request, response: Response) {
    const {
      teamName,
      teamLocalization,
      teamCountry,
      teamGrade,
      teamLeague,
      userId,
    } = request.body;

    const team = await this.createTeamService.execute({
      teamName,
      teamLocalization,
      teamCountry,
      teamGrade,
      teamLeague,
      userId,
    });

    return response.status(201).json(team);
  }
}
