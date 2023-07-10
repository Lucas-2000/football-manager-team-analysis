import { EnumTeamGrade } from "../utils/dicts/enumTeamGrade";

export interface TeamProps {
  teamId?: string;
  teamName: string;
  teamLocalization: string;
  teamCountry: string;
  teamLeague: string;
  teamGrade: EnumTeamGrade;
  teamLogo: string;
}

export class Team {
  private props: TeamProps;

  constructor(props: TeamProps) {
    this.props = props;
  }

  get teamId() {
    return this.props.teamId;
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
}
