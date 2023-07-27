import { PasswordResetProps } from "../../../entities/passwordReset";
import { PasswordResetRepository } from "../../../repositories/passwordResetRepository";

interface FindPasswordResetByTokenServiceRequest {
  token: string;
}

type FindPasswordResetByTokenServiceResponse = PasswordResetProps;

export class FindPasswordResetByTokenService {
  constructor(private passwordResetRepository: PasswordResetRepository) {}

  async execute({
    token,
  }: FindPasswordResetByTokenServiceRequest): Promise<FindPasswordResetByTokenServiceResponse> {
    const tokenExists = await this.passwordResetRepository.findByToken(token);

    if (!tokenExists) throw new Error("Token not found");

    const passwordReset: PasswordResetProps = tokenExists.getSummary();

    return passwordReset;
  }
}
