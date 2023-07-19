import { Request, Response } from "express";
import { AuthUserService } from "./authUserService";

export class AuthUserController {
  constructor(private authUserService: AuthUserService) {}

  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const user = await this.authUserService.execute({
      username,
      password,
    });

    return response.status(201).json(user);
  }
}
