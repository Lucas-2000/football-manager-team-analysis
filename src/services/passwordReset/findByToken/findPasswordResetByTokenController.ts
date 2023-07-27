import { Request, Response } from "express";
import { FindPasswordResetByTokenService } from "./findPasswordResetByTokenService";
export class FindPasswordResetByTokenController {
  constructor(
    private findPasswordResetByTokenService: FindPasswordResetByTokenService
  ) {}

  async handle(request: Request, response: Response) {
    const { token } = request.params;

    const passwordReset = await this.findPasswordResetByTokenService.execute({
      token,
    });

    return response.status(201).json(passwordReset);
  }
}
