import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../../repositories/inMemory/inMemoryUsersRepository";
import { FindUserByIdService } from "./findUserByIdService";
import { CreateUserService } from "../create/createUserService";

describe("Find User By Id", () => {
  it("should be able to find a user by id", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const findUserByIdService = new FindUserByIdService(usersRepository);
    const createUserService = new CreateUserService(usersRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    expect(findUserByIdService.execute({ id: "1" })).resolves.toHaveProperty(
      "id"
    );
  });

  it("should not be able to find a user by id if user not found", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const findUserByIdService = new FindUserByIdService(usersRepository);
    const createUserService = new CreateUserService(usersRepository);

    await createUserService.execute({
      id: "1",
      username: "test",
      email: "test@example.com",
      password: "test123",
    });

    expect(findUserByIdService.execute({ id: "2" })).rejects.toBeInstanceOf(
      Error
    );
  });
});
