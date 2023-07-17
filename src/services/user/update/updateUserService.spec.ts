import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../create/createUserService";
import { UpdateUserService } from "./updateUserService";

describe("Update User Service", () => {
  it("should be able to update a user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const updateUserService = new UpdateUserService(usersRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    expect(
      updateUserService.execute({
        id: "1",
        username: "testUpdate",
        email: "test@example.com",
        password: "test123",
      })
    ).resolves.toHaveProperty("id");
  });

  it("should not be able to update a user if user not found", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const updateUserService = new UpdateUserService(usersRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    expect(
      updateUserService.execute({
        id: "2",
        username: "testUpdate",
        email: "test@example.com",
        password: "test123",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
