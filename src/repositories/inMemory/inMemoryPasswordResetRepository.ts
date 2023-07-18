import { PasswordReset } from "../../entities/passwordReset";
import { PasswordResetRepository } from "../passwordResetRepository";

export class InMemoryPasswordResetRepository
  implements PasswordResetRepository
{
  private passwordReset: PasswordReset[] = [];

  async generate(passwordReset: PasswordReset): Promise<void> {
    this.passwordReset.push(passwordReset);
  }

  async findIndex(userId: string): Promise<number> {
    const passwordResetIndex = this.passwordReset.findIndex(
      (obj) => obj.userId === userId
    );

    if (passwordResetIndex < 0) return -1;

    return passwordResetIndex;
  }

  async delete(userId: string): Promise<void> {
    const passwordResetIndex = this.passwordReset.findIndex(
      (obj) => obj.userId === userId
    );

    if (passwordResetIndex !== -1) {
      this.passwordReset.splice(passwordResetIndex, 1);
    }
  }
}
