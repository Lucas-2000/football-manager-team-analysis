import { UserProps } from "../../../entities/user";
import { UsersRepository } from "../../../repositories/usersRepository";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { jwtSecret } from "../../../utils/config/jwt/jwtConfig";

interface AuthUserServiceRequest {
  username: string;
  password: string;
}

type AuthUserServiceResponse = {
  userSummary: UserProps;
  token: string;
};

export class AuthUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    password,
  }: AuthUserServiceRequest): Promise<AuthUserServiceResponse> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new Error("User or password incorrect");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error("User or password incorrect");

    if (!jwtSecret) throw new Error("JWT Key not found!");

    const token = sign({}, jwtSecret, {
      subject: user.id,
      expiresIn: "20s",
    });

    const userSummary = user.getSummary();

    return { userSummary, token };
  }
}
