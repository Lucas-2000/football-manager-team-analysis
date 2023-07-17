import { User, UserProps } from "../../../entities/user";
import { UsersRepository } from "../../../repositories/usersRepository";
import bcrypt from "bcrypt";

interface CreateUserServiceRequest {
  id?: string;
  username: string;
  email: string;
  password: string;
  avatar?: string | null;
}

type CreateUserServiceResponse = UserProps;

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    username,
    email,
    password,
    avatar,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const usernameExists = await this.usersRepository.verifyExistingUsername(
      username
    );

    if (usernameExists) throw new Error(`Username already exists`);

    const emailExists = await this.usersRepository.verifyExistingEmail(email);

    if (emailExists) throw new Error(`Email already exists`);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      id,
      username,
      email,
      password: hash,
      avatar,
    });

    await this.usersRepository.create(user);

    return user.getSummary();
  }
}
