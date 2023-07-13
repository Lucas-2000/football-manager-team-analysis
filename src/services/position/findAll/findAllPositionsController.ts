import { Request, Response } from "express";
import { FindAllPositionsService } from "./findAllPositionsService";

export class FindAllPositionsController {
  constructor(private findAllPositionsService: FindAllPositionsService) {}

  async handle(request: Request, response: Response) {
    const positions = await this.findAllPositionsService.execute();

    return response.status(201).json(positions);
  }
}
