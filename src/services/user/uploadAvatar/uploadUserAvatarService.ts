import fs from "fs/promises";
import path from "path";
import { User, UserProps } from "../../../entities/user";
import { UsersRepository } from "../../../repositories/usersRepository";

interface UploadUserAvatarServiceRequest {
  id: string;
  avatar?: string;
}

type UploadUserAvatarServiceResponse = UserProps;

export class UploadUserAvatarService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    avatar,
  }: UploadUserAvatarServiceRequest): Promise<UploadUserAvatarServiceResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new Error("User not found!");

    const uploadsFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "uploads"
    ); // Caminho base da pasta de uploads

    if (user.avatar) {
      const logoPath = path.join(uploadsFolder, user.avatar as string);
      await fs.unlink(logoPath);
    }

    const uploadAvatar = new User({
      id,
      username: user.username,
      email: user.email,
      password: user.password,
      avatar: avatar || null,
    });

    await this.usersRepository.update(uploadAvatar);

    return uploadAvatar.getSummary();
  }
}
