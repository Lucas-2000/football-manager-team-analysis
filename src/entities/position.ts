import { EnumPlayerPositionBase } from "../utils/dicts/enumPlayerPositionBase";
import { EnumPlayerPositionRole } from "../utils/dicts/enumPlayerPositionRole";
import { EnumRoleType } from "../utils/dicts/enumRoleType";

export interface PositionProps {
  id?: string;
  basePosition: EnumPlayerPositionBase;
  positionRole: EnumPlayerPositionRole;
  roleType: EnumRoleType[];
}

export class Position {
  private props: PositionProps;

  constructor(props: PositionProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
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

  getSummary(): PositionProps {
    return {
      id: this.props.id,
      basePosition: this.props.basePosition,
      positionRole: this.props.positionRole,
      roleType: this.props.roleType,
    };
  }
}
