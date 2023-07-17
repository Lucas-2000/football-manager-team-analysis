export interface UserProps {
  id?: string;
  username: string;
  email: string;
  password: string;
  avatar?: string | null;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get avatar() {
    return this.props.avatar;
  }

  getSummary(): UserProps {
    return {
      id: this.props.id,
      username: this.props.username,
      email: this.props.email,
      password: this.props.password,
      avatar: this.props.avatar,
    };
  }
}
