import bcrypt from "bcrypt";
import { User, UserProps } from "../../../entities/user";
import { UsersRepository } from "../../../repositories/usersRepository";

interface UpdateUserServiceRequest {
  id: string;
  username: string;
  email: string;
  password: string;
}

type UpdateUserServiceResponse = UserProps;

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    username,
    email,
    password,
  }: UpdateUserServiceRequest): Promise<UpdateUserServiceResponse> {
    const verifyIndex = await this.usersRepository.findIndex(id);

    if (verifyIndex < 0) throw new Error("User not found!");

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = new User({
        id,
        username,
        email,
        password: hash,
      });

      await this.usersRepository.update(user);

      return user.getSummary();
    }

    const user = new User({
      id,
      username,
      email,
      password,
    });

    await this.usersRepository.update(user);

    return user.getSummary();
  }
}
