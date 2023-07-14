import { Request, Response } from "express";
import { FindByBasePositionService } from "./findByBasePositionService";
import { EnumPlayerPositionBase } from "@prisma/client";

export class FindByBasePositionController {
  constructor(private findByBasePositionService: FindByBasePositionService) {}

  async handle(request: Request, response: Response) {
    const { basePosition } = request.params;

    const positions = await this.findByBasePositionService.execute({
      basePosition: basePosition as EnumPlayerPositionBase,
    });

    return response.status(201).json(positions);
  }
}
