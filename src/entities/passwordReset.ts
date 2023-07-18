import { generateRandomToken } from "../utils/math/generateRandomToken";
import { v4 as uuid } from "uuid";
export interface PasswordResetProps {
  id?: string;
  token?: string;
  expiresDate?: Date;
  userId: string;
}

export class PasswordReset {
  private props: PasswordResetProps;

  constructor(props: PasswordResetProps) {
    this.props = {
      ...props,
      id: props.id || uuid(),
      token: props.token || generateRandomToken(15), // Gera um novo token caso não seja fornecido
      expiresDate: props.expiresDate || new Date(Date.now() + 86400 * 1000), // Calcula o expiresDate caso não seja fornecido
    };
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
    return new PasswordReset({
      id: this.props.id,
      token: this.props.token,
      expiresDate: this.props.expiresDate,
      userId: this.props.userId,
    });
  }
}
