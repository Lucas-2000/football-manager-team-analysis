import { UsersRepository } from "../../../repositories/usersRepository";
import { PasswordResetRepository } from "../../../repositories/passwordResetRepository";
import {
  PasswordReset,
  PasswordResetProps,
} from "../../../entities/passwordReset";

interface GeneratePasswordResetServiceRequest {
  email: string;
}

type GeneratePasswordResetServiceResponse = PasswordResetProps;

export class GeneratePasswordResetService {
  constructor(
    private passwordResetRepository: PasswordResetRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    email,
  }: GeneratePasswordResetServiceRequest): Promise<GeneratePasswordResetServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error("User not found!");

    const userId = user.id as string;

    const index = await this.passwordResetRepository.findIndex(userId);

    if (index >= 0) await this.passwordResetRepository.delete(userId);

    const token = new PasswordReset({
      userId: userId,
    });

    await this.passwordResetRepository.generate(token);

    return token.getSummary();
  }
}
