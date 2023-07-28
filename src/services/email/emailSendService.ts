import { PasswordResetRepository } from "./../../repositories/passwordResetRepository";
import { Email, EmailProps } from "../../entities/email";
import { UsersRepository } from "../../repositories/usersRepository";
import transporter from "../../utils/config/mail/mailConfig";
import dotenv from "dotenv";

dotenv.config();

interface EmailSendServiceRequest {
  email: string;
  token: string;
  subject: string;
}

type EmailSendServiceResponse = EmailProps;

export class EmailSendService {
  constructor(
    private usersRepository: UsersRepository,
    private passwordResetRepository: PasswordResetRepository
  ) {}

  async execute({
    email,
    token,
    subject,
  }: EmailSendServiceRequest): Promise<EmailSendServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error("User not found!");

    const tokenIsValid = await this.passwordResetRepository.findByToken(token);

    if (!tokenIsValid) throw new Error("Invalid token!");

    const emailObj = new Email({
      email,
      token,
      subject,
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: emailObj.email,
      subject: emailObj.subject,
      text: `
        Olá ${user.username},
        \n
        segue o link para reset de senha: http://localhost:4200/reset-password/${emailObj.token}
        \n
        Obs: o link tem validade de 24h.
      `,
    };

    await transporter.sendMail(mailOptions);

    return emailObj.getSummary();
  }
}
