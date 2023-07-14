import { Request, Response } from "express";
import { DeletePlayerService } from "./deletePlayerService";

export class DeletePlayerController {
  constructor(private deletePlayerService: DeletePlayerService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const player = await this.deletePlayerService.execute({ id });

    return response.status(201).json(player);
  }
}
