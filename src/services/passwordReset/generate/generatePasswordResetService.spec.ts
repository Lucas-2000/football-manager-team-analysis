import { describe, expect, it } from "vitest";
import { InMemoryPasswordResetRepository } from "../../../repositories/inMemory/inMemoryPasswordResetRepository";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../../user/create/createUserService";
import { GeneratePasswordResetService } from "./generatePasswordResetService";

describe("Generate Password Reset Service", () => {
  it("should be able to generate a new password reset token", async () => {
    const resetPasswordRepository = new InMemoryPasswordResetRepository();
    const usersRepository = new InMemoryUsersRepository();
    const generatePasswordReset = new GeneratePasswordResetService(
      resetPasswordRepository,
      usersRepository
    );
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await expect(
      generatePasswordReset.execute({
        email: "test@example.com",
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to generate a new password reset token if user not found!", async () => {
    const resetPasswordRepository = new InMemoryPasswordResetRepository();
    const usersRepository = new InMemoryUsersRepository();
    const generatePasswordReset = new GeneratePasswordResetService(
      resetPasswordRepository,
      usersRepository
    );
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await expect(
      generatePasswordReset.execute({
        email: "test1@example.com",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
