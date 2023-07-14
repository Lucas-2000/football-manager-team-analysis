import { EnumPlayerAttributesRange } from "../utils/dicts/enumPlayerAttributesRange";

export interface PlayerProps {
  id?: string;
  name: string;
  birthdate: Date;
  lenght: number;
  weight: number;
  jersey: number;
  playerImage?: string | null;
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

export class Player {
  private props: PlayerProps;

  constructor(props: PlayerProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get birthdate() {
    return this.props.birthdate;
  }

  get lenght() {
    return this.props.lenght;
  }

  get weight() {
    return this.props.weight;
  }

  get jersey() {
    return this.props.jersey;
  }

  get positionId() {
    return this.props.positionId;
  }

  get teamId() {
    return this.props.teamId;
  }

  get playerImage() {
    return this.props.playerImage;
  }

  get corners() {
    return this.props.corners;
  }

  get crossing() {
    return this.props.crossing;
  }

  get dribbling() {
    return this.props.dribbling;
  }

  get finishing() {
    return this.props.finishing;
  }

  get firstTouch() {
    return this.props.firstTouch;
  }

  get freeKickTaking() {
    return this.props.freeKickTaking;
  }

  get heading() {
    return this.props.heading;
  }

  get longShots() {
    return this.props.longShots;
  }

  get longThrows() {
    return this.props.longThrows;
  }

  get marking() {
    return this.props.marking;
  }

  get passing() {
    return this.props.passing;
  }

  get penaltyTaking() {
    return this.props.penaltyTaking;
  }

  get tackling() {
    return this.props.tackling;
  }

  get technique() {
    return this.props.technique;
  }

  get agression() {
    return this.props.agression;
  }

  get anticipation() {
    return this.props.anticipation;
  }

  get bravery() {
    return this.props.bravery;
  }

  get composure() {
    return this.props.composure;
  }

  get concentration() {
    return this.props.concentration;
  }

  get decisions() {
    return this.props.decisions;
  }

  get determination() {
    return this.props.determination;
  }

  get flair() {
    return this.props.flair;
  }

  get leadership() {
    return this.props.leadership;
  }

  get offTheBall() {
    return this.props.offTheBall;
  }

  get positioning() {
    return this.props.positioning;
  }

  get teamWork() {
    return this.props.teamWork;
  }

  get vision() {
    return this.props.vision;
  }

  get workRate() {
    return this.props.workRate;
  }

  get acceleration() {
    return this.props.acceleration;
  }

  get agility() {
    return this.props.agility;
  }

  get balance() {
    return this.props.balance;
  }

  get jumpingReach() {
    return this.props.jumpingReach;
  }

  get naturalFitness() {
    return this.props.naturalFitness;
  }

  get pace() {
    return this.props.pace;
  }

  get stamina() {
    return this.props.stamina;
  }

  get strenght() {
    return this.props.strenght;
  }

  getSummary(): PlayerProps {
    return {
      id: this.props.id,
      name: this.props.name,
      birthdate: this.props.birthdate,
      lenght: this.props.lenght,
      weight: this.props.weight,
      jersey: this.props.jersey,
      playerImage: this.props.playerImage,
      positionId: this.props.positionId,
      teamId: this.props.teamId,
      corners: this.props.corners,
      crossing: this.props.crossing,
      dribbling: this.props.dribbling,
      finishing: this.props.finishing,
      firstTouch: this.props.firstTouch,
      freeKickTaking: this.props.freeKickTaking,
      heading: this.props.heading,
      longShots: this.props.longShots,
      longThrows: this.props.longThrows,
      marking: this.props.marking,
      passing: this.props.passing,
      penaltyTaking: this.props.penaltyTaking,
      tackling: this.props.tackling,
      technique: this.props.technique,
      agression: this.props.agression,
      anticipation: this.props.anticipation,
      bravery: this.props.bravery,
      composure: this.props.composure,
      concentration: this.props.concentration,
      decisions: this.props.decisions,
      determination: this.props.determination,
      flair: this.props.flair,
      leadership: this.props.leadership,
      offTheBall: this.props.offTheBall,
      positioning: this.props.positioning,
      teamWork: this.props.teamWork,
      vision: this.props.vision,
      workRate: this.props.workRate,
      acceleration: this.props.acceleration,
      agility: this.props.agility,
      balance: this.props.balance,
      jumpingReach: this.props.jumpingReach,
      naturalFitness: this.props.naturalFitness,
      pace: this.props.pace,
      stamina: this.props.stamina,
      strenght: this.props.strenght,
    };
  }
}
