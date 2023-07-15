import fs from "fs/promises";
import path from "path";
import { PlayersRepository } from "./../../../repositories/playersRepository";

interface DeletePlayerRequest {
  id: string;
}

type DeletePlayerResponse = [];

export class DeletePlayerService {
  constructor(private playersRepository: PlayersRepository) {}

  async execute({ id }: DeletePlayerRequest): Promise<DeletePlayerResponse> {
    const playerIndex = await this.playersRepository.findIndex(id);

    if (playerIndex < 0) throw new Error("Player not found!");

    const player = await this.playersRepository.findById(id);

    const playerImage = player?.playerImage;

    if (!playerImage) {
      throw new Error("Team logo not found!");
    }

    const uploadsFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "uploads"
    ); // Caminho base da pasta de uploads
    const logoPath = path.join(uploadsFolder, playerImage);

    await fs.unlink(logoPath);

    this.playersRepository.delete(id);

    return [];
  }
}
