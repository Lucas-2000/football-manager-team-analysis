import { Request, Response } from "express";
import { FindTeamByIdService } from "./findTeamByIdService";

export class FindTeamByIdController {
  constructor(private findTeamByIdService: FindTeamByIdService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const team = await this.findTeamByIdService.execute({ id });

    return response.status(201).json(team);
  }
}
