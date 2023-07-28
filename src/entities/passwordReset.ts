export interface PasswordResetProps {
  id?: string;
  token?: string;
  expiresDate?: Date;
  userId: string;
}

export class PasswordReset {
  private props: PasswordResetProps;

  constructor(props: PasswordResetProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get token() {
    return this.props.token;
  }

  get expiresDate() {
    return this.props.expiresDate;
  }

  get userId() {
    return this.props.userId;
  }

  hasExpired(): boolean {
    const expiryDateMillis = Date.now() + 86400 * 1000; // Adiciona expiresIn em milissegundos ao Date.now()
    const expiryDate = new Date(expiryDateMillis);
    return expiryDate.getTime() < Date.now();
  }

  getSummary(): PasswordResetProps {
    return {
      id: this.props.id,
      token: this.props.token,
      expiresDate: this.props.expiresDate,
      userId: this.props.userId,
    };
  }
}
