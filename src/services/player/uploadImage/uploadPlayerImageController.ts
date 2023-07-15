import { Request, Response } from "express";
import { UploadPlayerImageService } from "./uploadPlayerImageService";

export class UploadPlayerImageController {
  constructor(private uploadPlayerImageService: UploadPlayerImageService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const playerImage = request.file;

    const uploadPlayerImage = await this.uploadPlayerImageService.execute({
      id,
      playerImage: playerImage?.filename,
    });

    return response.status(201).json(uploadPlayerImage);
  }
}
