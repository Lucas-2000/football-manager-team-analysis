import { Request, Response } from "express";
import { UploadUserAvatarService } from "./uploadUserAvatarService";

export class UploadUserAvatarController {
  constructor(private uploadUserAvatarService: UploadUserAvatarService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const avatar = request.file;

    const uploadUserAvatar = await this.uploadUserAvatarService.execute({
      id,
      avatar: avatar?.filename,
    });

    return response.status(201).json(uploadUserAvatar);
  }
}
