import { EnumTeamGrade } from "../utils/dicts/enumTeamGrade";
import { v4 as uuid } from "uuid";

export interface TeamProps {
  id?: string;
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamLeague: string;
  teamGrade: EnumTeamGrade;
  teamLogo?: string | null;
  userId: string;
}

export class Team {
  private props: TeamProps;

  constructor(props: TeamProps) {
    this.props = {
      ...props,
      id: props.id || uuid(),
    };
  }

  get id() {
    return this.props.id;
  }

  get teamName() {
    return this.props.teamName;
  }

  get teamLocalization() {
    return this.props.teamLocalization;
  }

  get teamCountry() {
    return this.props.teamCountry;
  }

  get teamLeague() {
    return this.props.teamLeague;
  }

  get teamGrade() {
    return this.props.teamGrade;
  }

  get teamLogo() {
    return this.props.teamLogo;
  }

  get userId() {
    return this.props.userId;
  }

  getSummary(): TeamProps {
    return {
      id: this.props.id,
      teamName: this.props.teamName,
      teamLocalization: this.props.teamLocalization,
      teamCountry: this.props.teamCountry,
      teamLeague: this.props.teamLeague,
      teamGrade: this.props.teamGrade,
      teamLogo: this.props.teamLogo,
      userId: this.props.userId,
    };
  }
}
