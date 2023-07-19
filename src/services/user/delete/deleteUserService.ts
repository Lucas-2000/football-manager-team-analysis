import fs from "fs/promises";
import path from "path";
import { UsersRepository } from "../../../repositories/usersRepository";

interface DeleteUserServiceRequest {
  id: string;
}

type DeleteUserServiceResponse = [];

export class DeleteUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: DeleteUserServiceRequest): Promise<DeleteUserServiceResponse> {
    const verifyIndex = await this.usersRepository.findIndex(id);

    if (verifyIndex < 0) throw new Error("User not found!");

    const user = await this.usersRepository.findById(id);

    const avatar = user?.avatar;

    const uploadsFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "uploads"
    ); // Caminho base da pasta de uploads

    if (avatar) {
      const logoPath = path.join(uploadsFolder, avatar);
      await fs.unlink(logoPath);
    }

    await this.usersRepository.delete(id);

    return [];
  }
}
