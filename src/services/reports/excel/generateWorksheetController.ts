import fs from "fs";
import { Request, Response } from "express";
import { GenerateWorksheetService } from "./generateWorksheetService";

export class GenerateWorksheetController {
  constructor(private generateWorksheetService: GenerateWorksheetService) {}

  async handle(request: Request, response: Response) {
    const { userId, teamId } = request.params;

    const worksheet = await this.generateWorksheetService.execute({
      userId,
      teamId,
    });

    return response.download(worksheet, () => {
      fs.unlinkSync(worksheet);
    });
  }
}
