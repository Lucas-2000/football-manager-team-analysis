import { Request, Response } from "express";
import { EmailSendService } from "./emailSendService";

export class EmailSendController {
  constructor(private emailSendService: EmailSendService) {}

  async handle(request: Request, response: Response) {
    const { email, token, subject } = request.body;

    const sendEmail = await this.emailSendService.execute({
      email,
      token,
      subject,
    });

    return response.status(201).json(sendEmail);
  }
}
