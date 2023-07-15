import { Player } from "../../entities/player";
import { prisma } from "../../prisma/prismaClient";
import { EnumPlayerAttributesRange } from "../../utils/dicts/enumPlayerAttributesRange";
import { PlayersRepository } from "../playersRepository";
import { v4 as uuid } from "uuid";

export class PrismaPlayersRepository implements PlayersRepository {
  async create({
    name,
    birthdate,
    lenght,
    weight,
    jersey,
    playerImage,
    positionId,
    teamId,
    corners,
    crossing,
    dribbling,
    finishing,
    firstTouch,
    freeKickTaking,
    heading,
    longShots,
    longThrows,
    marking,
    passing,
    penaltyTaking,
    tackling,
    technique,
    agression,
    anticipation,
    bravery,
    composure,
    concentration,
    decisions,
    determination,
    flair,
    leadership,
    offTheBall,
    positioning,
    teamWork,
    vision,
    workRate,
    acceleration,
    agility,
    balance,
    jumpingReach,
    naturalFitness,
    pace,
    stamina,
    strenght,
  }: Player): Promise<void> {
    await prisma.player.create({
      data: {
        id: uuid(),
        name,
        birthdate,
        lenght,
        weight,
        jersey,
        playerImage,
        positionId,
        teamId,
        corners,
        crossing,
        dribbling,
        finishing,
        firstTouch,
        freeKickTaking,
        heading,
        longShots,
        longThrows,
        marking,
        passing,
        penaltyTaking,
        tackling,
        technique,
        agression,
        anticipation,
        bravery,
        composure,
        concentration,
        decisions,
        determination,
        flair,
        leadership,
        offTheBall,
        positioning,
        teamWork,
        vision,
        workRate,
        acceleration,
        agility,
        balance,
        jumpingReach,
        naturalFitness,
        pace,
        stamina,
        strenght,
      },
    });
  }

  async verifyExists(playerName: string, teamId: string): Promise<boolean> {
    const player = await prisma.player.findFirst({
      where: {
        name: playerName,
        teamId: teamId,
      },
    });

    return !!player;
  }

  async findAll(): Promise<Player[]> {
    const players = await prisma.player.findMany();

    return players.map(
      (player) =>
        new Player({
          id: player.id,
          name: player.name,
          birthdate: player.birthdate,
          lenght: player.lenght,
          weight: player.weight,
          jersey: player.jersey,
          playerImage: player.playerImage,
          positionId: player.positionId,
          teamId: player.teamId,
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
        })
    );
  }

  async findById(playerId: string): Promise<Player | undefined> {
    const player = await prisma.player.findFirst({
      where: {
        id: playerId,
      },
    });

    if (player === null) return;

    return new Player({
      id: player.id,
      name: player.name,
      birthdate: player.birthdate,
      lenght: player.lenght,
      weight: player.weight,
      jersey: player.jersey,
      playerImage: player.playerImage,
      positionId: player.positionId,
      teamId: player.teamId,
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
    });
  }

  async findIndex(playerId: string): Promise<number> {
    const players = await prisma.player.findMany();
    const playerIndex = players.findIndex((player) => player.id === playerId);

    if (playerIndex < 0) return -1;

    return playerIndex;
  }

  async update({
    id,
    name,
    birthdate,
    lenght,
    weight,
    jersey,
    playerImage,
    positionId,
    teamId,
    corners,
    crossing,
    dribbling,
    finishing,
    firstTouch,
    freeKickTaking,
    heading,
    longShots,
    longThrows,
    marking,
    passing,
    penaltyTaking,
    tackling,
    technique,
    agression,
    anticipation,
    bravery,
    composure,
    concentration,
    decisions,
    determination,
    flair,
    leadership,
    offTheBall,
    positioning,
    teamWork,
    vision,
    workRate,
    acceleration,
    agility,
    balance,
    jumpingReach,
    naturalFitness,
    pace,
    stamina,
    strenght,
  }: Player): Promise<void> {
    await prisma.player.update({
      where: { id },
      data: {
        name,
        birthdate,
        lenght,
        weight,
        jersey,
        playerImage,
        positionId,
        teamId,
        corners,
        crossing,
        dribbling,
        finishing,
        firstTouch,
        freeKickTaking,
        heading,
        longShots,
        longThrows,
        marking,
        passing,
        penaltyTaking,
        tackling,
        technique,
        agression,
        anticipation,
        bravery,
        composure,
        concentration,
        decisions,
        determination,
        flair,
        leadership,
        offTheBall,
        positioning,
        teamWork,
        vision,
        workRate,
        acceleration,
        agility,
        balance,
        jumpingReach,
        naturalFitness,
        pace,
        stamina,
        strenght,
      },
    });
  }

  async delete(playerId: string): Promise<void> {
    await prisma.player.delete({
      where: {
        id: playerId,
      },
    });
  }

  async checkAttributeInteval(
    attribute: EnumPlayerAttributesRange
  ): Promise<boolean> {
    if (attribute < 0 || attribute > 20) return false;

    return true;
  }
}
