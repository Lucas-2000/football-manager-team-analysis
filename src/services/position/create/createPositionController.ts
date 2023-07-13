import { Request, Response } from "express";
import { CreatePositionService } from "./createPositionService";

export class CreatePositionController {
  constructor(private createPositionService: CreatePositionService) {}

  async handle(request: Request, response: Response) {
    const { basePosition, positionRole, roleType } = request.body;

    const position = await this.createPositionService.execute({
      basePosition,
      positionRole,
      roleType,
    });

    return response.status(201).json(position);
  }
}
