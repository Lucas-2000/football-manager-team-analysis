import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../create/createUserService";
import { AuthUserService } from "./authUserService";

describe("Auth user service", () => {
  it("should be able to auth user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const authUserService = new AuthUserService(usersRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    const authResult = await authUserService.execute({
      username: "test",
      password: "test123",
    });

    expect(authResult).toHaveProperty("userSummary");
    expect(authResult).toHaveProperty("token");
  });

  it("should not be able to auth user if user not found", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const authUserService = new AuthUserService(usersRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await expect(
      authUserService.execute({
        username: "test",
        password: "test12",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
