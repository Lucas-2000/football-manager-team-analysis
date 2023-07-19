import { Request, Response } from "express";
import { CreateUserService } from "./createUserService";

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  async handle(request: Request, response: Response) {
    const { username, email, password, avatar } = request.body;

    const user = await this.createUserService.execute({
      username,
      email,
      password,
      avatar,
    });

    return response.status(201).json(user);
  }
}
