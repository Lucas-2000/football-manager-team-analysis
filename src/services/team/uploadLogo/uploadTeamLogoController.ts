import { Request, Response } from "express";
import { UploadTeamLogoService } from "./uploadTeamLogoService";

export class UploadTeamLogoController {
  constructor(private uploadTeamLogoService: UploadTeamLogoService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const teamLogo = request.file;

    const uploadLogo = await this.uploadTeamLogoService.execute({
      id,
      teamLogo: teamLogo?.filename,
    });

    return response.status(201).json(uploadLogo);
  }
}
