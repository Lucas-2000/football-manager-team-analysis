import { Player, PlayerProps } from "../../../entities/player";
import { PositionsRepository } from "../../../repositories/positionsRepository";
import { TeamsRepository } from "../../../repositories/teamsRepository";
import { EnumPlayerAttributesRange } from "../../../utils/dicts/enumPlayerAttributesRange";
import { PlayersRepository } from "./../../../repositories/playersRepository";

interface UpdatePlayerRequest {
  id: string;
  name: string;
  birthdate: string;
  lenght: number;
  weight: number;
  jersey: number;
  playerImage?: string;
  positionId: string;
  teamId: string;
  corners: EnumPlayerAttributesRange;
  crossing: EnumPlayerAttributesRange;
  dribbling: EnumPlayerAttributesRange;
  finishing: EnumPlayerAttributesRange;
  firstTouch: EnumPlayerAttributesRange;
  freeKickTaking: EnumPlayerAttributesRange;
  heading: EnumPlayerAttributesRange;
  longShots: EnumPlayerAttributesRange;
  longThrows: EnumPlayerAttributesRange;
  marking: EnumPlayerAttributesRange;
  passing: EnumPlayerAttributesRange;
  penaltyTaking: EnumPlayerAttributesRange;
  tackling: EnumPlayerAttributesRange;
  technique: EnumPlayerAttributesRange;
  agression: EnumPlayerAttributesRange;
  anticipation: EnumPlayerAttributesRange;
  bravery: EnumPlayerAttributesRange;
  composure: EnumPlayerAttributesRange;
  concentration: EnumPlayerAttributesRange;
  decisions: EnumPlayerAttributesRange;
  determination: EnumPlayerAttributesRange;
  flair: EnumPlayerAttributesRange;
  leadership: EnumPlayerAttributesRange;
  offTheBall: EnumPlayerAttributesRange;
  positioning: EnumPlayerAttributesRange;
  teamWork: EnumPlayerAttributesRange;
  vision: EnumPlayerAttributesRange;
  workRate: EnumPlayerAttributesRange;
  acceleration: EnumPlayerAttributesRange;
  agility: EnumPlayerAttributesRange;
  balance: EnumPlayerAttributesRange;
  jumpingReach: EnumPlayerAttributesRange;
  naturalFitness: EnumPlayerAttributesRange;
  pace: EnumPlayerAttributesRange;
  stamina: EnumPlayerAttributesRange;
  strenght: EnumPlayerAttributesRange;
}

type UpdatePlayerResponse = PlayerProps;

export class UpdatePlayerService {
  constructor(
    private playersRepository: PlayersRepository,
    private teamsRepository: TeamsRepository,
    private positionsRepository: PositionsRepository
  ) {}

  async execute({
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
  }: UpdatePlayerRequest): Promise<UpdatePlayerResponse> {
    const index = await this.playersRepository.findIndex(id);

    if (index < 0) throw new Error("Player not found!");

    const teamExists = await this.teamsRepository.findById(teamId);

    if (!teamExists) throw new Error("Team don't exists");

    const positionExists = await this.positionsRepository.findById(positionId);

    if (!positionExists) throw new Error("Position don't exists");

    const attList = [
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
    ];

    await Promise.all(
      attList.map(async (att) => {
        if (!(await this.playersRepository.checkAttributeInteval(att))) {
          throw new Error("Incorrect attribute interval");
        }
      })
    );

    const player = new Player({
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
    });

    await this.playersRepository.update(player);

    return player.getSummary();
  }
}
