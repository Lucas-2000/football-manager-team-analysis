import { Request, Response } from "express";
import { UpdatePositionService } from "./updatePositionService";

export class UpdatePositionController {
  constructor(private updatePositionService: UpdatePositionService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { basePosition, positionRole, roleType } = request.body;

    const position = await this.updatePositionService.execute({
      id,
      basePosition,
      positionRole,
      roleType,
    });

    return response.status(201).json(position);
  }
}
