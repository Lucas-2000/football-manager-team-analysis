import { Request, Response } from "express";
import { FindAllTeamsService } from "./findAllTeamsService";

export class FindAllTeamsController {
  constructor(private findAllTeamsService: FindAllTeamsService) {}

  async handle(request: Request, response: Response) {
    const teams = await this.findAllTeamsService.execute();

    return response.status(201).json(teams);
  }
}
