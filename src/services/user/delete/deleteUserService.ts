import { UsersRepository } from "../../../repositories/usersRepository";

interface DeleteUserServiceRequest {
  id: string;
}

type DeleteUserServiceResponse = [];

export class DeleteUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: DeleteUserServiceRequest): Promise<DeleteUserServiceResponse> {
    const verifyIndex = await this.usersRepository.findIndex(id);

    if (verifyIndex < 0) throw new Error("Team not found!");

    await this.usersRepository.delete(id);

    return [];
  }
}
