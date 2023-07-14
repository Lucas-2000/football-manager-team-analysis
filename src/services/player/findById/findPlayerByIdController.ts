import { Request, Response } from "express";
import { FindPlayerByIdService } from "./findPlayerByIdService";

export class FindPlayerByIdController {
  constructor(private findPlayerByIdService: FindPlayerByIdService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const player = await this.findPlayerByIdService.execute({ id });

    return response.status(201).json(player);
  }
}
