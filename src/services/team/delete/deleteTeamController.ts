import { Request, Response } from "express";
import { DeleteTeamService } from "./deleteTeamService";

export class DeleteTeamController {
  constructor(private deleteTeamService: DeleteTeamService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const team = await this.deleteTeamService.execute({ id });

    return response.status(201).json(team);
  }
}
