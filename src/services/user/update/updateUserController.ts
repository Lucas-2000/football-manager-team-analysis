import { Request, Response } from "express";
import { UpdateUserService } from "./updateUserService";

export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { username, email, password } = request.body;

    const user = await this.updateUserService.execute({
      id,
      username,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}
