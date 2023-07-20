import { PasswordReset } from "../entities/passwordReset";

export interface PasswordResetRepository {
  generate(passwordReset: PasswordReset): Promise<void>;
  findIndex(userId: string): Promise<number>;
  delete(userId: string): Promise<void>;
  findByToken(token: string): Promise<PasswordReset | undefined>;
}
