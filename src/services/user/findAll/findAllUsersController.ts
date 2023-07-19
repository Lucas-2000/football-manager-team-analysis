import { Request, Response } from "express";
import { FindAllUsersService } from "./findAllUsersService";

export class FindAllUsersController {
  constructor(private findAllUsersService: FindAllUsersService) {}

  async handle(request: Request, response: Response) {
    const users = await this.findAllUsersService.execute();

    return response.status(201).json(users);
  }
}
