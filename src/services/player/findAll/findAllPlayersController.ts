import { Request, Response } from "express";
import { FindAllPlayersService } from "./findAllPlayersService";

export class FindAllPlayersController {
  constructor(private findAllPlayersService: FindAllPlayersService) {}

  async handle(request: Request, response: Response) {
    const players = await this.findAllPlayersService.execute();

    return response.status(201).json(players);
  }
}
