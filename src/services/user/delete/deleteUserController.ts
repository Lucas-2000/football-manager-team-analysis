import { Request, Response } from "express";
import { DeleteUserService } from "./deleteUserService";

export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const user = await this.deleteUserService.execute({ id });

    return response.status(201).json(user);
  }
}
