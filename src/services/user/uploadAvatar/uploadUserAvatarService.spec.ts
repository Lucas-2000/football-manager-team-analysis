import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { UploadUserAvatarService } from "./uploadUserAvatarService";
import { CreateUserService } from "../create/createUserService";

describe("Upload User Avatar Service", () => {
  it("should be able to upload user avatar", async () => {
    const userRepository = new InMemoryUsersRepository();
    const uploadUserAvatarService = new UploadUserAvatarService(userRepository);
    const createUserService = new CreateUserService(userRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await expect(
      uploadUserAvatarService.execute({
        id: "1",
        avatar: "afsaosfaoksfafas.png",
      })
    ).resolves.toHaveProperty("avatar");
  });

  it("should not be able to upload user avatar if user not found", async () => {
    const userRepository = new InMemoryUsersRepository();
    const uploadUserAvatarService = new UploadUserAvatarService(userRepository);
    const createUserService = new CreateUserService(userRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await expect(
      uploadUserAvatarService.execute({
        id: "2",
        avatar: "afsaosfaoksfafas.png",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to upload user avatar if user avatar not found", async () => {
    const userRepository = new InMemoryUsersRepository();
    const uploadUserAvatarService = new UploadUserAvatarService(userRepository);
    const createUserService = new CreateUserService(userRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await expect(
      uploadUserAvatarService.execute({
        id: "1",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
