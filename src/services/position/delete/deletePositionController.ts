import { Request, Response } from "express";
import { DeletePositionService } from "./deletePositionService";

export class DeletePositionController {
  constructor(private deletePositionService: DeletePositionService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const position = await this.deletePositionService.execute({ id });

    return response.status(201).json(position);
  }
}
