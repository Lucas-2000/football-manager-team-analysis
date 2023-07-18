import { Player, PlayerProps } from "../../../entities/player";
import { PositionsRepository } from "../../../repositories/positionsRepository";
import { TeamsRepository } from "../../../repositories/teamsRepository";
import { UsersRepository } from "../../../repositories/usersRepository";
import { EnumPlayerAttributesRange } from "../../../utils/dicts/enumPlayerAttributesRange";
import { PlayersRepository } from "./../../../repositories/playersRepository";

interface UpdatePlayerRequest {
  id: string;
  name: string;
  birthdate: string;
  lenght: number;
  weight: number;
  jersey: number;
  positionId: string;
  teamId: string;
  userId: string;
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
    private positionsRepository: PositionsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    id,
    name,
    birthdate,
    lenght,
    weight,
    jersey,
    positionId,
    teamId,
    userId,
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

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists) throw new Error("User don't exists");

    const playerExists = await this.playersRepository.findById(id);

    if (playerExists?.name !== name) {
      if (await this.playersRepository.verifyExists(name, teamId))
        throw new Error(`Player ${name} already exists for this user!`);
    }

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
      positionId,
      teamId,
      userId,
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
