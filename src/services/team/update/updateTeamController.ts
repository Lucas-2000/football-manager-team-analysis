import { Request, Response } from "express";
import { UpdateTeamService } from "./updateTeamService";

export class UpdateTeamController {
  constructor(private updateTeamService: UpdateTeamService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const {
      teamName,
      teamLocalization,
      teamCountry,
      teamGrade,
      teamLeague,
      teamLogo,
    } = request.body;

    const team = await this.updateTeamService.execute({
      id,
      teamName,
      teamLocalization,
      teamCountry,
      teamGrade,
      teamLeague,
      teamLogo,
    });

    return response.status(201).json(team);
  }
}
