import { User, UserProps } from "../../../entities/user";
import { UsersRepository } from "../../../repositories/usersRepository";

interface UploadUserAvatarServiceRequest {
  id: string;
  avatar?: string;
}

type UploadUserAvatarServiceResponse = UserProps;

export class UploadUserAvatarService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    avatar,
  }: UploadUserAvatarServiceRequest): Promise<UploadUserAvatarServiceResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new Error("User not found!");

    if (!avatar) throw new Error("Avatar not found!");

    const uploadAvatar = new User({
      id,
      username: user.username,
      email: user.email,
      password: user.password,
      avatar,
    });

    await this.usersRepository.update(uploadAvatar);

    return uploadAvatar.getSummary();
  }
}
