import { Request, Response } from "express";
import { FindUserByIdService } from "./findUserByIdService";

export class FindUserByIdController {
  constructor(private findUserByIdService: FindUserByIdService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const user = await this.findUserByIdService.execute({
      id,
    });

    return response.status(201).json(user);
  }
}
