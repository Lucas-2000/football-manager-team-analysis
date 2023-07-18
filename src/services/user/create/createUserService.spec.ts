import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "./createUserService";

describe("Create User Service", () => {
  it("should be able to create a new user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUserService(usersRepository);
    await expect(
      createUser.execute({
        id: "1",
        username: "test",
        email: "test@example.com",
        password: "test123",
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to create a new user if username already exists", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await expect(
      createUser.execute({
        id: "1",
        username: "test",
        email: "test@example1.com",
        password: "test123",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a new user if email already exists", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUserService(usersRepository);

    await createUser.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    await expect(
      createUser.execute({
        id: "1",
        username: "test1",
        email: "test@example.com",
        password: "test123",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
