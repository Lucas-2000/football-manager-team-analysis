import { EnumPlayerPositionBase } from "../utils/dicts/enumPlayerPositionBase";
import { EnumPlayerPositionRole } from "../utils/dicts/enumPlayerPositionRole";
import { EnumRoleType } from "../utils/dicts/enumRoleType";

export interface PositionProps {
  positionId: string;
  basePosition: EnumPlayerPositionBase;
  positionRole: EnumPlayerPositionRole;
  roleType: EnumRoleType[];
}

export class Position {
  private props: PositionProps;

  constructor(props: PositionProps) {
    this.props = props;
  }

  get positionId() {
    return this.props.positionId;
  }

  get basePosition() {
    return this.props.basePosition;
  }

  get positionRole() {
    return this.props.positionRole;
  }

  get roleType() {
    return this.props.roleType;
  }
}
