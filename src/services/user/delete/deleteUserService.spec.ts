import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { CreateUserService } from "../create/createUserService";
import { DeleteUserService } from "./deleteUserService";

describe("Delete User Service", () => {
  it("should be able to delete a user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const deleteUserService = new DeleteUserService(usersRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
      avatar: null,
    });

    await expect(
      deleteUserService.execute({ id: "1" })
    ).resolves.toBeInstanceOf(Array);
  });

  it("should not be able to delete a user if user not found", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUserService = new CreateUserService(usersRepository);
    const deleteUserService = new DeleteUserService(usersRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
      avatar: null,
    });

    await expect(deleteUserService.execute({ id: "2" })).rejects.toBeInstanceOf(
      Error
    );
  });
});
