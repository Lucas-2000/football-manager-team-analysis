import { Request, Response } from "express";
import { GeneratePasswordResetService } from "./generatePasswordResetService";

export class GeneratePasswordResetController {
  constructor(
    private generatePasswordResetService: GeneratePasswordResetService
  ) {}

  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const token = await this.generatePasswordResetService.execute({ email });

    return response.status(201).json(token);
  }
}
