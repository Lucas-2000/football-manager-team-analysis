import { UserProps } from "../../../entities/user";
import { UsersRepository } from "../../../repositories/usersRepository";

type FindAllUsersServiceResponse = UserProps[];

export class FindAllUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FindAllUsersServiceResponse> {
    const users = await this.usersRepository.findAll();

    const userSummaries: UserProps[] = users.map((u) => u.getSummary());

    return userSummaries;
  }
}
