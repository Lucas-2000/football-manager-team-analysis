import fs from "fs/promises";
import { PlayersRepository } from "./../../../repositories/playersRepository";
import { Player, PlayerProps } from "../../../entities/player";
import path from "path";

interface UploadPlayerImageRequest {
  id: string;
  playerImage?: string;
}

type UploadPlayerImageResponse = PlayerProps;

export class UploadPlayerImageService {
  constructor(private playersRepository: PlayersRepository) {}

  async execute({
    id,
    playerImage,
  }: UploadPlayerImageRequest): Promise<UploadPlayerImageResponse> {
    const player = await this.playersRepository.findById(id);

    if (!player) throw new Error("Player not found!");

    const uploadsFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "uploads"
    ); // Caminho base da pasta de uploads

    if (player.playerImage) {
      const logoPath = path.join(uploadsFolder, player.playerImage as string);
      await fs.unlink(logoPath);
    }

    const uploadPlayerImage = new Player({
      id,
      name: player.name,
      birthdate: player.birthdate,
      lenght: player.lenght,
      weight: player.weight,
      jersey: player.jersey,
      positionId: player.positionId,
      teamId: player.teamId,
      userId: player.userId,
      corners: player.corners,
      crossing: player.crossing,
      dribbling: player.dribbling,
      finishing: player.finishing,
      firstTouch: player.firstTouch,
      freeKickTaking: player.freeKickTaking,
      heading: player.heading,
      longShots: player.longShots,
      longThrows: player.longThrows,
      marking: player.marking,
      passing: player.passing,
      penaltyTaking: player.penaltyTaking,
      tackling: player.tackling,
      technique: player.technique,
      agression: player.agression,
      anticipation: player.anticipation,
      bravery: player.bravery,
      composure: player.composure,
      concentration: player.concentration,
      decisions: player.decisions,
      determination: player.determination,
      flair: player.flair,
      leadership: player.leadership,
      offTheBall: player.offTheBall,
      positioning: player.positioning,
      teamWork: player.teamWork,
      vision: player.vision,
      workRate: player.workRate,
      acceleration: player.acceleration,
      agility: player.agility,
      balance: player.balance,
      jumpingReach: player.jumpingReach,
      naturalFitness: player.naturalFitness,
      pace: player.pace,
      stamina: player.stamina,
      strenght: player.strenght,
      playerImage,
    });

    await this.playersRepository.update(uploadPlayerImage);

    return uploadPlayerImage.getSummary();
  }
}
