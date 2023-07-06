import { EnumTeamGrade } from "../utils/dicts/enumTeamGrade";

export interface TeamProps {
  id: string;
  team_name: string;
  team_localization: string;
  team_country: string;
  team_grade: EnumTeamGrade;
}

export class Team {
  private props: TeamProps;

  constructor(props: TeamProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get teamName() {
    return this.props.team_name;
  }

  get teamLocalization() {
    return this.props.team_localization;
  }

  get teamCountry() {
    return this.props.team_country;
  }

  get teamGrade() {
    return this.props.team_grade;
  }
}
