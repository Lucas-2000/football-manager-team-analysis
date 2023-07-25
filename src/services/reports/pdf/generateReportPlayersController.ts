import { Request, Response } from "express";
import { GenerateReportPlayersService } from "./generateReportPlayersService";

export class GenerateReportPlayersController {
  constructor(
    private generateReportPlayersService: GenerateReportPlayersService
  ) {}

  async handle(request: Request, response: Response) {
    const { userId, teamId } = request.params;

    const report = await this.generateReportPlayersService.execute({
      userId,
      teamId,
    });

    response.setHeader("Content-Type", "application/pdf");
    response.setHeader("Content-Disposition", "inline; filename=Relatorio.pdf");

    response.end(report);

    return response.status(200).json(report);
  }
}
